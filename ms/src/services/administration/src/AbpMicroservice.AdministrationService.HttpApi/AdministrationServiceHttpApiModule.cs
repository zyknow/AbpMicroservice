using SharpAbp.Abp.AuditLogging;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.HttpApi;
using Volo.Abp.SettingManagement;

namespace AbpMicroservice.AdministrationService;

[DependsOn(
    typeof(AdministrationServiceApplicationContractsModule),
    typeof(AbpPermissionManagementHttpApiModule),
    typeof(AbpFeatureManagementHttpApiModule),
    typeof(AbpSettingManagementHttpApiModule),
    typeof(AuditLoggingHttpApiModule)
)]
public class AdministrationServiceHttpApiModule : AbpModule
{
}