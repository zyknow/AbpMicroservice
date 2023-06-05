using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using AbpMicroservice.IdentityService.EntityFrameworkCore;
using AbpMicroservice.SaasService.EntityFrameworkCore;
using AbpMicroservice.Shared.Definition;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice.Shared.Localization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using OpenIddict.Server.AspNetCore;
using Prometheus;
using StackExchange.Redis;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.Account.Web;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.Auditing;
using Volo.Abp.BackgroundJobs.RabbitMQ;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.Emailing;
using Volo.Abp.EventBus.RabbitMq;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.OpenIddict;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.VirtualFileSystem;

namespace AbpMicroservice;

[DependsOn(
    typeof(AbpCachingStackExchangeRedisModule),
    typeof(AbpEventBusRabbitMqModule),
    typeof(AbpBackgroundJobsRabbitMqModule),
    typeof(AbpAspNetCoreMvcUiLeptonXLiteThemeModule),
    typeof(AbpAccountWebOpenIddictModule),
    typeof(AbpAccountApplicationModule),
    typeof(AbpAccountHttpApiModule),
    typeof(AdministrationServiceEntityFrameworkCoreModule),
    typeof(IdentityServiceEntityFrameworkCoreModule),
    typeof(SaasServiceEntityFrameworkCoreModule),
    typeof(AbpMicroserviceSharedHostingAspNetCoreModule),
    typeof(AbpMicroserviceSharedLocalizationModule)
)]
public class AbpMicroserviceAuthServerModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        var hostingEnvironment = context.Services.GetHostingEnvironment();
        var configuration = context.Services.GetConfiguration();

        PreConfigure<OpenIddictBuilder>(builder =>
        {
            builder.AddValidation(options =>
            {
                options.AddAudiences(AppServiceConsts.AccountServiceName);
                options.UseLocalServer();
                options.UseAspNetCore();
            });
        });

        if (!hostingEnvironment.IsDevelopment())
        {
            PreConfigure<AbpOpenIddictAspNetCoreOptions>(options =>
            {
                options.AddDevelopmentEncryptionAndSigningCertificate = false;
            });

            PreConfigure<OpenIddictServerBuilder>(builder =>
            {
                builder.AddSigningCertificate(GetSigningCertificate(hostingEnvironment, configuration));
                builder.AddEncryptionCertificate(GetSigningCertificate(hostingEnvironment, configuration));
                builder.SetIssuer(new Uri(configuration["AuthServer:Authority"]!));
            });
        }
    }

    private void SwaggerConfiguration(ServiceConfigurationContext context, IConfiguration configuration,
        string serviceName)
    {
        SwaggerConfigurationHelper.ConfigureWithAuth(
            context,
            configuration["AuthServer:Authority"]!,
            AppServiceConsts.GetAllServiceNameDescDic().ToDictionary(x => x.Key, x => ""),
            $@"{serviceName ?? AppServiceConsts.AppName} API"
        );
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var hostingEnvironment = context.Services.GetHostingEnvironment();
        var configuration = context.Services.GetConfiguration();

        if (!Convert.ToBoolean(configuration["App:DisablePII"]))
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

        if (!Convert.ToBoolean(configuration["AuthServer:RequireHttpsMetadata"]))
            Configure<OpenIddictServerAspNetCoreOptions>(options =>
            {
                options.DisableTransportSecurityRequirement = true;
            });

        SwaggerConfiguration(context, configuration, AppServiceConsts.AccountServiceName);
        ConfigureBundles();
        ConfigureSameSiteCookiePolicy(context);
        ConfigureExternalProviders(context);

        Configure<AbpAuditingOptions>(options => { options.ApplicationName = "AuthServer"; });

        Configure<AppUrlOptions>(options =>
        {
            options.Applications["MVC"].RootUrl = configuration["App:SelfUrl"];
            options.RedirectAllowedUrls.AddRange(configuration["App:RedirectAllowedUrls"]?.Split(',') ??
                                                 Array.Empty<string>());
        });

        Configure<AbpDistributedCacheOptions>(options => { options.KeyPrefix = @$"{AppServiceConsts.AppName}:"; });

        var dataProtectionBuilder = context.Services.AddDataProtection().SetApplicationName(AppServiceConsts.AppName);
        var redis = ConnectionMultiplexer.Connect(configuration["Redis:Configuration"]);
        dataProtectionBuilder.PersistKeysToStackExchangeRedis(redis, @$"{AppServiceConsts.AppName}-Protection-Keys");

        context.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                    .WithOrigins(
                        configuration["App:CorsOrigins"]?
                            .Split(",", StringSplitOptions.RemoveEmptyEntries)
                            .Select(o => o.Trim().RemovePostFix("/"))
                            .ToArray() ?? Array.Empty<string>()
                    )
                    .WithAbpExposedHeaders()
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

#if DEBUG
        context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif

        if (hostingEnvironment.IsDevelopment())
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.ReplaceEmbeddedByPhysical<AbpMicroserviceSharedLocalizationModule>(Path.Combine(
                    hostingEnvironment.ContentRootPath,
                    $"..{Path.DirectorySeparatorChar}..{Path.DirectorySeparatorChar}..{Path.DirectorySeparatorChar}..{Path.DirectorySeparatorChar}shared{Path.DirectorySeparatorChar}{AppServiceConsts.AppName}.Shared.Localization"));
            });
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();

        app.Use(async (ctx, next) =>
        {
            if (ctx.Request.Headers.ContainsKey("from-ingress")) ctx.Request.Scheme = "https";

            await next();
        });

        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

        app.UseAbpRequestLocalization();

        if (!env.IsDevelopment()) app.UseErrorPage();

        app.UseCorrelationId();
        app.UseAbpSecurityHeaders();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseCookiePolicy();
        app.UseHttpMetrics();
        app.UseAuthentication();
        app.UseAbpOpenIddictValidation();
        app.UseMultiTenancy();
        app.UseAbpSerilogEnrichers();
        app.UseUnitOfWork();
        app.UseAuthorization();
        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Account Service API");
            options.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
        });
        app.UseAuditing();
        app.UseConfiguredEndpoints(endpoints => { endpoints.MapMetrics(); });
    }

    private void ConfigureBundles()
    {
        Configure<AbpBundlingOptions>(options =>
        {
            options.StyleBundles.Configure(
                LeptonXLiteThemeBundles.Styles.Global,
                bundle => { bundle.AddFiles("/global-styles.css"); }
            );
        });
    }

    private void ConfigureExternalProviders(ServiceConfigurationContext context)
    {
    }

    private X509Certificate2 GetSigningCertificate(IWebHostEnvironment hostingEnv, IConfiguration configuration)
    {
        var fileName = "authserver.pfx";
        var passPhrase = "2D7AA457-5D33-48D6-936F-C48E5EF468ED";
        var file = Path.Combine(hostingEnv.ContentRootPath, fileName);

        if (!File.Exists(file)) throw new FileNotFoundException($"Signing Certificate couldn't found: {file}");

        return new X509Certificate2(file, passPhrase);
    }

    private void ConfigureSameSiteCookiePolicy(ServiceConfigurationContext context)
    {
        context.Services.AddSameSiteCookiePolicy();
    }
}