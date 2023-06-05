using SharpAbp.Abp.AuditLogging;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;

namespace AbpMicroservice.AdministrationService;

[DependsOn(
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule),
    typeof(AdministrationServiceApplicationContractsModule),
    typeof(AuditLoggingApplicationModule),
    typeof(AdministrationServiceDomainModule)
)]
public class AdministrationServiceApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAutoMapperObjectMapper<AdministrationServiceApplicationModule>();
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<AdministrationServiceApplicationModule>(validate: true);
        });
    }
}