using AbpMicroservice.IdentityService.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace AbpMicroservice.IdentityService;

[DependsOn(
    typeof(IdentityServiceEntityFrameworkCoreTestModule)
    )]
public class IdentityServiceDomainTestModule : AbpModule
{

}
