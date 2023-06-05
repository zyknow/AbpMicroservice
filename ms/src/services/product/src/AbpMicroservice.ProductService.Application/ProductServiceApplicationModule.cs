using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Application;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace AbpMicroservice.ProductService;

[DependsOn(
    typeof(ProductServiceDomainModule),
    typeof(ProductServiceApplicationContractsModule),
    typeof(AbpDddApplicationModule),
    typeof(AbpAutoMapperModule)
)]
public class ProductServiceApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAutoMapperObjectMapper<ProductServiceApplicationModule>();
        Configure<AbpAutoMapperOptions>(
            options => { options.AddMaps<ProductServiceApplicationModule>(validate: true); });
    }
}