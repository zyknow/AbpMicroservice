using AbpMicroservice.ProductService.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace AbpMicroservice.ProductService;

[DependsOn(
    typeof(ProductServiceEntityFrameworkCoreTestModule)
    )]
public class ProductServiceDomainTestModule : AbpModule
{

}
