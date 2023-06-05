using AbpMicroservice.Shared.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.OpenIddict.EntityFrameworkCore;

namespace AbpMicroservice.IdentityService.EntityFrameworkCore;

[DependsOn(
    typeof(IdentityServiceDomainModule),
    typeof(AbpMicroserviceSharedEntityFrameworkCoreModule),
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule)
)]
public class IdentityServiceEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {

        context.Services.AddAbpDbContext<IdentityServiceDbContext>(options =>
        {
            options.ReplaceDbContext<IIdentityDbContext>();
            options.ReplaceDbContext<IOpenIddictDbContext>();

            /* includeAllEntities: true allows to use IRepository<TEntity, TKey> also for non aggregate root entities */
            options.AddDefaultRepositories(true);
        });
    }
}