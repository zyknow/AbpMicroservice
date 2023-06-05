using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using Volo.Abp.VirtualFileSystem;

namespace AbpMicroservice.SaasService;

[DependsOn(
    typeof(SaasServiceApplicationContractsModule),
    typeof(AbpHttpClientModule),
    typeof(AbpTenantManagementHttpApiClientModule)
)]
public class SaasServiceHttpApiClientModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddHttpClientProxies(
            typeof(SaasServiceApplicationContractsModule).Assembly,
            SaasServiceRemoteServiceConsts.RemoteServiceName
        );

        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<SaasServiceHttpApiClientModule>();
        });
    }
}