using SharpAbp.Abp.AuditLogging;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;

namespace AbpMicroservice.AdministrationService;

[DependsOn(
    typeof(AbpPermissionManagementApplicationContractsModule),
    typeof(AbpFeatureManagementApplicationContractsModule),
    typeof(AbpSettingManagementApplicationContractsModule),
    typeof(AuditLoggingApplicationContractsModule),
    typeof(AdministrationServiceDomainSharedModule)
)]
public class AdministrationServiceApplicationContractsModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        AdministrationServiceDtoExtensions.Configure();
    }
}