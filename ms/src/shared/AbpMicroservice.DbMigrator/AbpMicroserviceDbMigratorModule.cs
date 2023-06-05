using AbpMicroservice.AdministrationService;
using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using AbpMicroservice.IdentityService;
using AbpMicroservice.IdentityService.EntityFrameworkCore;
using AbpMicroservice.ProductService;
using AbpMicroservice.ProductService.EntityFrameworkCore;
using AbpMicroservice.SaasService;
using AbpMicroservice.SaasService.EntityFrameworkCore;
using AbpMicroservice.Shared.Hosting;
using Volo.Abp.Modularity;

namespace AbpMicroservice.DbMigrator;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingModule),
    typeof(IdentityServiceEntityFrameworkCoreModule),
    typeof(IdentityServiceApplicationContractsModule),
    typeof(SaasServiceEntityFrameworkCoreModule),
    typeof(SaasServiceApplicationContractsModule),
    typeof(AdministrationServiceEntityFrameworkCoreModule),
    typeof(AdministrationServiceApplicationContractsModule),
    typeof(ProductServiceEntityFrameworkCoreModule),
    typeof(ProductServiceApplicationContractsModule)
)]
public class AbpMicroserviceDbMigratorModule : AbpModule
{
}