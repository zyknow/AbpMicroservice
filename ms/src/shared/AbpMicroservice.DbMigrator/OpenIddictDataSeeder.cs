using AbpMicroservice.DbMigrator.Model;
using AbpMicroservice.Shared.Definition;
using JetBrains.Annotations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using OpenIddict.Abstractions;
using Volo.Abp;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.MultiTenancy;
using Volo.Abp.PermissionManagement;
using Volo.Abp.Uow;

namespace AbpMicroservice.DbMigrator;

public class OpenIddictDataSeeder : ITransientDependency, IDataSeedContributor
{
    private readonly IConfiguration _configuration;
    private readonly ICurrentTenant _currentTenant;
    private readonly IOpenIddictApplicationManager _applicationManager;
    private readonly IOpenIddictScopeManager _scopeManager;
    private readonly IPermissionDataSeeder _permissionDataSeeder;
    private readonly IStringLocalizer<OpenIddictResponse> L;

    public OpenIddictDataSeeder(
        IConfiguration configuration,
        ICurrentTenant currentTenant,
        IOpenIddictApplicationManager applicationManager,
        IOpenIddictScopeManager scopeManager,
        IPermissionDataSeeder permissionDataSeeder,
        IStringLocalizer<OpenIddictResponse> l)
    {
        _configuration = configuration;
        _currentTenant = currentTenant;
        _applicationManager = applicationManager;
        _scopeManager = scopeManager;
        _permissionDataSeeder = permissionDataSeeder;
        L = l;
    }

    public Task SeedAsync(DataSeedContext context)
    {
        return SeedAsync();
    }

    [UnitOfWork]
    public virtual async Task SeedAsync()
    {
        using (_currentTenant.Change(null))
        {
            await CreateApiScopesAsync();
            await CreateWebGatewaySwaggerClientsAsync();
            await CreateClientsAsync();
        }
    }


    private List<string> GetAllScopes()
    {
        return AppServiceConsts.GetAllServiceNames().ToList();
    }

    private async Task CreateApiScopesAsync()
    {
        foreach (var serviceName in GetAllScopes()) await CreateScopesAsync(serviceName);
    }

    private async Task CreateWebGatewaySwaggerClientsAsync()
    {
        await CreateSwaggerClientAsync("WebGateway",
            AppServiceConsts.GetAllServiceNames());
    }

    private Dictionary<string, string> GetResources()
    {
        return AppServiceConsts.GetAllServiceNames().ToDictionary(serviceName => serviceName,
            serviceName => _configuration[$"OpenIddict:Resources:{serviceName}:RootUrl"]?.TrimEnd('/'));
    }

    private async Task CreateSwaggerClientAsync(string name, string[] scopes = null)
    {
        var commonScopes = new List<string>
        {
            OpenIddictConstants.Permissions.Scopes.Address,
            OpenIddictConstants.Permissions.Scopes.Email,
            OpenIddictConstants.Permissions.Scopes.Phone,
            OpenIddictConstants.Permissions.Scopes.Profile,
            OpenIddictConstants.Permissions.Scopes.Roles,
            "offline_access"
        };

        scopes ??= new[] {name};

        // Swagger Client
        var swaggerClientId = $"{name}_Swagger";
        if (!swaggerClientId.IsNullOrWhiteSpace())
        {
            var webGatewaySwaggerRootUrl = _configuration[$"OpenIddict:SwaggerClients:{name}"]?.TrimEnd('/');

            var redirectServiceUrls = GetResources()
                .Select(resource => @$"{resource.Value}/swagger/oauth2-redirect.html")
                .ToList();

            await CreateApplicationAsync(
                swaggerClientId!,
                OpenIddictConstants.ClientTypes.Public,
                OpenIddictConstants.ConsentTypes.Implicit,
                "Swagger Client",
                null,
                new List<string>
                {
                    OpenIddictConstants.GrantTypes.AuthorizationCode
                },
                commonScopes.Union(scopes).ToList(),
                new List<string>
                {
                    $"{webGatewaySwaggerRootUrl}/swagger/oauth2-redirect.html" // WebGateway redirect uri
                }.Union(redirectServiceUrls).ToList()
            );
        }
    }

    private async Task CreateScopesAsync(string name)
    {
        if (await _scopeManager.FindByNameAsync(name) == null)
            await _scopeManager.CreateAsync(new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = name + " API",
                Resources =
                {
                    name
                }
            });
    }

    private async Task CreateClientsAsync()
    {
        var commonScopes = new List<string>
        {
            OpenIddictConstants.Permissions.Scopes.Address,
            OpenIddictConstants.Permissions.Scopes.Email,
            OpenIddictConstants.Permissions.Scopes.Phone,
            OpenIddictConstants.Permissions.Scopes.Profile,
            OpenIddictConstants.Permissions.Scopes.Roles,
            // "offline_access"
        };

        var clients = _configuration.GetSection("OpenIddict:Clients").Get<List<ServiceClient>>();

        foreach (var client in clients)
        {
            var isClientSecretAvailable = !string.IsNullOrEmpty(client.ClientSecret);

            await CreateApplicationAsync(
                name: client.ClientId,
                type: isClientSecretAvailable
                    ? OpenIddictConstants.ClientTypes.Confidential
                    : OpenIddictConstants.ClientTypes.Public,
                consentType: OpenIddictConstants.ConsentTypes.Implicit,
                displayName: client.ClientId,
                secret: isClientSecretAvailable ? client.ClientSecret : null,
                grantTypes: client.GrantTypes.ToList(),
                scopes: commonScopes.Union(client.Scopes ?? GetAllScopes()).ToList(),
                redirectUris: client.RedirectUris,
                postLogoutRedirectUris: client.PostLogoutRedirectUris,
                permissions: client.Permissions
            );
        }
        //
        // // Create AdministrationService Client
        // await CreateApplicationAsync(
        //     name: "AdministrationService",
        //     type: OpenIddictConstants.ClientTypes.Confidential,
        //     consentType: OpenIddictConstants.ConsentTypes.Implicit,
        //     displayName: "Administration Service Client",
        //     secret: "1q2w3e*",
        //     grantTypes: new List<string>
        //     {
        //         OpenIddictConstants.GrantTypes.ClientCredentials
        //     },
        //     scopes: commonScopes.Union(new[] {AppServiceConsts.IdentityServiceName}).ToList(),
        //     permissions: new List<string> {IdentityPermissions.Users.Default}
        // );
    }

    private async Task CreateApplicationAsync(
        [NotNull] string name,
        [NotNull] string type,
        [NotNull] string consentType,
        string displayName,
        string secret,
        List<string> grantTypes,
        List<string> scopes,
        List<string> redirectUris = null,
        List<string> postLogoutRedirectUris = null,
        List<string> permissions = null)
    {
        if (!string.IsNullOrEmpty(secret) && string.Equals(type, OpenIddictConstants.ClientTypes.Public,
                StringComparison.OrdinalIgnoreCase))
            throw new BusinessException(L["NoClientSecretCanBeSetForPublicApplications"]);

        if (string.IsNullOrEmpty(secret) && string.Equals(type, OpenIddictConstants.ClientTypes.Confidential,
                StringComparison.OrdinalIgnoreCase))
            throw new BusinessException(L["TheClientSecretIsRequiredForConfidentialApplications"]);

        if (!string.IsNullOrEmpty(name) && await _applicationManager.FindByClientIdAsync(name) != null) return;
        //throw new BusinessException(L["TheClientIdentifierIsAlreadyTakenByAnotherApplication"]);
        var client = await _applicationManager.FindByClientIdAsync(name);
        if (client == null)
        {
            var application = new OpenIddictApplicationDescriptor
            {
                ClientId = name,
                Type = type,
                ClientSecret = secret,
                ConsentType = consentType,
                DisplayName = displayName
            };

            Check.NotNullOrEmpty(grantTypes, nameof(grantTypes));
            Check.NotNullOrEmpty(scopes, nameof(scopes));

            if (new[] {OpenIddictConstants.GrantTypes.AuthorizationCode, OpenIddictConstants.GrantTypes.Implicit}.All(
                    grantTypes.Contains))
            {
                application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.CodeIdToken);

                if (string.Equals(type, OpenIddictConstants.ClientTypes.Public, StringComparison.OrdinalIgnoreCase))
                {
                    application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.CodeIdTokenToken);
                    application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.CodeToken);
                }
            }

            if (!redirectUris.IsNullOrEmpty() || !postLogoutRedirectUris.IsNullOrEmpty())
                application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Logout);

            var buildInGrantTypes = new[]
            {
                OpenIddictConstants.GrantTypes.Implicit,
                OpenIddictConstants.GrantTypes.Password,
                OpenIddictConstants.GrantTypes.AuthorizationCode,
                OpenIddictConstants.GrantTypes.ClientCredentials,
                OpenIddictConstants.GrantTypes.DeviceCode,
                OpenIddictConstants.GrantTypes.RefreshToken
            };

            foreach (var grantType in grantTypes)
            {
                if (grantType == OpenIddictConstants.GrantTypes.AuthorizationCode)
                {
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode);
                    application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.Code);
                }

                if (grantType == OpenIddictConstants.GrantTypes.AuthorizationCode ||
                    grantType == OpenIddictConstants.GrantTypes.Implicit)
                    application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Authorization);

                if (grantType == OpenIddictConstants.GrantTypes.AuthorizationCode ||
                    grantType == OpenIddictConstants.GrantTypes.ClientCredentials ||
                    grantType == OpenIddictConstants.GrantTypes.Password ||
                    grantType == OpenIddictConstants.GrantTypes.RefreshToken ||
                    grantType == OpenIddictConstants.GrantTypes.DeviceCode)
                {
                    application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Token);
                    application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Revocation);
                    application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Introspection);
                }

                if (grantType == OpenIddictConstants.GrantTypes.ClientCredentials)
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.ClientCredentials);

                if (grantType == OpenIddictConstants.GrantTypes.Implicit)
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.Implicit);

                if (grantType == OpenIddictConstants.GrantTypes.Password)
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.Password);

                if (grantType == OpenIddictConstants.GrantTypes.RefreshToken)
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.RefreshToken);

                if (grantType == OpenIddictConstants.GrantTypes.DeviceCode)
                {
                    application.Permissions.Add(OpenIddictConstants.Permissions.GrantTypes.DeviceCode);
                    application.Permissions.Add(OpenIddictConstants.Permissions.Endpoints.Device);
                }

                if (grantType == OpenIddictConstants.GrantTypes.Implicit)
                {
                    application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.IdToken);
                    if (string.Equals(type, OpenIddictConstants.ClientTypes.Public, StringComparison.OrdinalIgnoreCase))
                    {
                        application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.IdTokenToken);
                        application.Permissions.Add(OpenIddictConstants.Permissions.ResponseTypes.Token);
                    }
                }

                if (!buildInGrantTypes.Contains(grantType))
                    application.Permissions.Add(OpenIddictConstants.Permissions.Prefixes.GrantType + grantType);
            }

            var buildInScopes = new[]
            {
                OpenIddictConstants.Permissions.Scopes.Address,
                OpenIddictConstants.Permissions.Scopes.Email,
                OpenIddictConstants.Permissions.Scopes.Phone,
                OpenIddictConstants.Permissions.Scopes.Profile,
                OpenIddictConstants.Permissions.Scopes.Roles
            };

            foreach (var scope in scopes)
                if (buildInScopes.Contains(scope))
                    application.Permissions.Add(scope);
                else
                    application.Permissions.Add(OpenIddictConstants.Permissions.Prefixes.Scope + scope);

            if (!redirectUris.IsNullOrEmpty())
                foreach (var redirectUri in redirectUris!)
                {
                    if (!Uri.TryCreate(redirectUri, UriKind.Absolute, out var uri) || !uri.IsWellFormedOriginalString())
                        throw new BusinessException(L["InvalidRedirectUri", redirectUri!]);

                    if (application.RedirectUris.All(x => x != uri)) application.RedirectUris.Add(uri);
                }

            if (!postLogoutRedirectUris.IsNullOrEmpty())
                foreach (var postLogoutRedirectUri in postLogoutRedirectUris!)
                {
                    if (!Uri.TryCreate(postLogoutRedirectUri, UriKind.Absolute, out var uri) ||
                        !uri.IsWellFormedOriginalString())
                        throw new BusinessException(L["InvalidPostLogoutRedirectUri", postLogoutRedirectUri!]);

                    if (application.PostLogoutRedirectUris.All(x => x != uri))
                        application.PostLogoutRedirectUris.Add(uri);
                }

            if (permissions != null)
                await _permissionDataSeeder.SeedAsync(
                    ClientPermissionValueProvider.ProviderName,
                    name,
                    permissions,
                    null
                );

            await _applicationManager.CreateAsync(application);
        }
    }
}