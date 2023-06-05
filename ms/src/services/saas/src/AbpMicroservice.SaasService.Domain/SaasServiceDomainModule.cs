using Volo.Abp.Domain;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(AbpDddDomainModule),
    typeof(SaasServiceDomainSharedModule),
    typeof(AbpTenantManagementDomainModule)
)]
public class SaasServiceDomainModule : AbpModule
{
}