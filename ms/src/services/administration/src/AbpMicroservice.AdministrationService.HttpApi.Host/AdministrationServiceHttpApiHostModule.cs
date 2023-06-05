using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using AbpMicroservice.Shared.Definition;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice.Shared.Hosting.Microservices;
using AbpMicroservice.Shared.Localization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Prometheus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Http.Client.IdentityModel.Web;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement;

namespace AbpMicroservice.AdministrationService;

[DependsOn(
    typeof(AbpMicroserviceSharedLocalizationModule),
    typeof(AbpHttpClientIdentityModelWebModule),
    typeof(AbpIdentityHttpApiClientModule),
    typeof(AbpAccountApplicationContractsModule),
    typeof(AbpMicroserviceSharedHostingMicroservicesModule),
    typeof(AdministrationServiceApplicationModule),
    typeof(AdministrationServiceEntityFrameworkCoreModule),
    typeof(AdministrationServiceHttpApiModule),
    typeof(AbpOpenIddictDomainSharedModule)
)]
public class AdministrationServiceHttpApiHostModule : AbpModule
{
    private const string ServiceApiDesc = @$"{AppServiceConsts.AdministrationServiceDisplayName} API";

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        var hostingEnvironment = context.Services.GetHostingEnvironment();

        Configure<PermissionManagementOptions>(options => { options.IsDynamicPermissionStoreEnabled = true; });
        Configure<FeatureManagementOptions>(options => { options.IsDynamicFeatureStoreEnabled = true; });
        
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

        app.UseCorrelationId();
        app.UseAbpRequestLocalization();
        app.UseAbpSecurityHeaders();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseHttpMetrics();
        app.UseAuthentication();
        app.UseAbpClaimsMap();
        app.UseMultiTenancy();
        app.UseAuthorization();
        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
            options.SwaggerEndpoint("/swagger/v1/swagger.json", ServiceApiDesc);
            options.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
        });
        app.UseAbpSerilogEnrichers();
        app.UseAuditing();
        app.UseUnitOfWork();
        app.UseConfiguredEndpoints(endpoints => { endpoints.MapMetrics(); });
    }
}