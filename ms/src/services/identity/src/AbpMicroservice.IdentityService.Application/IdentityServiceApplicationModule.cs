using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;

namespace AbpMicroservice.IdentityService;

[DependsOn(
    typeof(AbpIdentityApplicationModule),
    typeof(IdentityServiceDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(IdentityServiceApplicationContractsModule)
)]
public class IdentityServiceApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAutoMapperObjectMapper<IdentityServiceApplicationModule>();
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<IdentityServiceApplicationModule>(validate: true);
        });
    }
}