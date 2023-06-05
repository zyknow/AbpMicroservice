using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Application;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(SaasServiceDomainModule),
    typeof(SaasServiceApplicationContractsModule),
    typeof(AbpDddApplicationModule),
    typeof(AbpAutoMapperModule),
    typeof(AbpTenantManagementApplicationModule)
)]
public class SaasServiceApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAutoMapperObjectMapper<SaasServiceApplicationModule>();
        Configure<AbpAutoMapperOptions>(options => { options.AddMaps<SaasServiceApplicationModule>(validate: true); });
    }
}