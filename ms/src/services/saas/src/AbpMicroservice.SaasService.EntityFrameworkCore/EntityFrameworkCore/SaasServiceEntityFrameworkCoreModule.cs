using AbpMicroservice.Shared.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace AbpMicroservice.SaasService.EntityFrameworkCore;

[DependsOn(
    typeof(SaasServiceDomainModule),
    typeof(AbpMicroserviceSharedEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule)
)]
public class SaasServiceEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpDbContextOptions>(options => { options.UseNpgsql(); });

        // https://www.npgsql.org/efcore/release-notes/6.0.html#opting-out-of-the-new-timestamp-mapping-logic
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        context.Services.AddAbpDbContext<SaasServiceDbContext>(options =>
        {
            options.ReplaceDbContext<ITenantManagementDbContext>();

            /* includeAllEntities: true allows to use IRepository<TEntity, TKey> also for non aggregate root entities */
            options.AddDefaultRepositories(true);
        });
    }
}