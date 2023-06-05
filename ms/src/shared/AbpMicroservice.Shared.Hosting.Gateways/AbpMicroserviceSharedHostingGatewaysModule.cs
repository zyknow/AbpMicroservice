using AbpMicroservice.Shared.Hosting.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Volo.Abp.Modularity;
using Volo.Abp.Swashbuckle;

namespace AbpMicroservice.Shared.Hosting.Gateways;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingAspNetCoreModule),
    typeof(AbpSwashbuckleModule)
)]
public class AbpMicroserviceSharedHostingGatewaysModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        var env = context.Services.GetHostingEnvironment();

        context.Services.AddReverseProxy().LoadFromConfig(configuration.GetSection("Yarp"));
    }
}