using AbpMicroservice.SaasService.Localization;
using Localization.Resources.AbpUi;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(SaasServiceApplicationContractsModule),
    typeof(AbpAspNetCoreMvcModule),
    typeof(AbpTenantManagementHttpApiModule)
)]
public class SaasServiceHttpApiModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<IMvcBuilder>(mvcBuilder =>
        {
            mvcBuilder.AddApplicationPartIfNotExists(typeof(SaasServiceHttpApiModule).Assembly);
        });
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Get<SaasServiceResource>()
                .AddBaseTypes(typeof(AbpUiResource));
        });
    }
}