using AbpMicroservice.Shared.Hosting.AspNetCore.Helpers;
using AbpMicroservice.Shared.Hosting.AspNetCore.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Volo.Abp.AspNetCore.Mvc.UI.MultiTenancy;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.EventBus.RabbitMq;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.Swashbuckle;

namespace AbpMicroservice.Shared.Hosting.AspNetCore;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingModule),
    typeof(AbpAspNetCoreMvcUiMultiTenancyModule),
    typeof(AbpAspNetCoreSerilogModule),
    typeof(AbpSwashbuckleModule),
    typeof(AbpEventBusRabbitMqModule)
)]
public class AbpMicroserviceSharedHostingAspNetCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();

        Configure<AbpMultiTenancyOptions>(options =>
        {
            options.IsEnabled = true;
        });

        ConfigureOpenTelemetry(context.Services, configuration);
    }

    public void ConfigureOpenTelemetry(IServiceCollection services, IConfiguration configuration)
    {

        // format service name
        var serviceName = AppDomainHelper.GetAppServiceName();

        var jaegerOptions = new JaegerOptions();

        configuration.GetSection(JaegerOptions.Jaeger).Bind(jaegerOptions);

        // AddOpenTelemetry
        services.AddOpenTelemetry().WithTracing(builder =>
        {
            builder.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName))
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation();

            if (jaegerOptions.Enabled)
            {
                builder.AddJaegerExporter(opt =>
                {
                    opt.AgentHost = jaegerOptions?.Host ?? "localhost";
                    opt.AgentPort = jaegerOptions?.Port ?? 6831;
                });
            }
        });
    }
}