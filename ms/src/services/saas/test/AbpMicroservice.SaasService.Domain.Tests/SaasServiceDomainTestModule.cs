using AbpMicroservice.SaasService.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(SaasServiceEntityFrameworkCoreTestModule)
    )]
public class SaasServiceDomainTestModule : AbpModule
{

}
