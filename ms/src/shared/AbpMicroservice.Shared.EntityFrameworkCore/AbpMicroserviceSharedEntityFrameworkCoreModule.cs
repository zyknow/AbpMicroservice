using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;
using Volo.Abp.Modularity;

namespace AbpMicroservice.Shared.EntityFrameworkCore;


[DependsOn(
    typeof(AbpEntityFrameworkCorePostgreSqlModule)
)]

public class AbpMicroserviceSharedEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpDbContextOptions>(options => { options.UseNpgsql(); });

        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
}
