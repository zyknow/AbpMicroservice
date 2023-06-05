using Volo.Abp.Account;
using Volo.Abp.Authorization;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;

namespace AbpMicroservice.IdentityService;

[DependsOn(
    typeof(AbpIdentityApplicationContractsModule),
    typeof(AbpAccountApplicationContractsModule),
    typeof(IdentityServiceDomainSharedModule),
    typeof(AbpAuthorizationModule)
)]
public class IdentityServiceApplicationContractsModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        IdentityServiceDtoExtensions.Configure();
    }
}