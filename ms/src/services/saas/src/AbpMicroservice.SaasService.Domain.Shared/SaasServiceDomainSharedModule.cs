using AbpMicroservice.SaasService.Localization;
using AbpMicroservice.Shared.Definition;
using Volo.Abp.Localization;
using Volo.Abp.Localization.ExceptionHandling;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using Volo.Abp.Validation;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(AbpValidationModule),
    typeof(AbpTenantManagementDomainSharedModule)
)]
public class SaasServiceDomainSharedModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        SaasServiceModuleExtensionConfigurator.Configure();
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<SaasServiceDomainSharedModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Resources
                .Add<SaasServiceResource>("en")
                .AddBaseTypes(typeof(AbpValidationResource))
                .AddVirtualJson(@$"/Localization/{AppServiceConsts.SaasServiceName}");

            options.DefaultResourceType = typeof(SaasServiceResource);
        });
        Configure<AbpExceptionLocalizationOptions>(options =>
        {
            options.MapCodeNamespace(AppServiceConsts.SaasServiceName, typeof(SaasServiceResource));
        });
    }
}