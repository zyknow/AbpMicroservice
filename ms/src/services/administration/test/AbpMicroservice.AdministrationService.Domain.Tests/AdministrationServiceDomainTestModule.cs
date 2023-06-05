using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace AbpMicroservice.AdministrationService;

[DependsOn(
    typeof(AdministrationServiceEntityFrameworkCoreTestModule)
    )]
public class AdministrationServiceDomainTestModule : AbpModule
{

}
