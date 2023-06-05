using AbpMicroservice.Shared.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;

namespace AbpMicroservice.AdministrationService.EntityFrameworkCore;

[DependsOn(
    typeof(AdministrationServiceDomainModule),
    typeof(AbpMicroserviceSharedEntityFrameworkCoreModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule)
)]
public class AdministrationServiceEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {

        context.Services.AddAbpDbContext<AdministrationServiceDbContext>(options =>
        {
            options.ReplaceDbContext<IPermissionManagementDbContext>();
            options.ReplaceDbContext<ISettingManagementDbContext>();
            options.ReplaceDbContext<IFeatureManagementDbContext>();
            options.ReplaceDbContext<IAuditLoggingDbContext>();

            options.AddDefaultRepositories(true);
        });
    }
}