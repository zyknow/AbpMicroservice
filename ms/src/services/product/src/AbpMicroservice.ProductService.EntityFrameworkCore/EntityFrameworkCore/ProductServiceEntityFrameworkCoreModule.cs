using AbpMicroservice.Shared.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AbpMicroservice.ProductService.EntityFrameworkCore;

[DependsOn(
    typeof(ProductServiceDomainModule),
    typeof(AbpMicroserviceSharedEntityFrameworkCoreModule)
)]
public class ProductServiceEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {

        context.Services.AddAbpDbContext<ProductServiceDbContext>(options =>
        {
            /* Remove "includeAllEntities: true" to create
             * default repositories only for aggregate roots */
            options.AddDefaultRepositories(true);
        });

        ProductServiceEfCoreEntityExtensionMappings.Configure();
    }
}