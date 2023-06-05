using AbpMicroservice.Shared.ConfigurationCenter;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice.Shared.Hosting.Gateways;
using AbpMicroservice.WebGateway;
using Serilog;

var assemblyName = typeof(Program).Assembly.GetName().Name;

SerilogConfigurationHelper.Configure(assemblyName!);

try
{
    Log.Information($"Starting {assemblyName}.");
    var builder = WebApplication.CreateBuilder(args);
    builder.Host
        .AddAppSettingsSecretsJson()
        .AddYarpJson()
        .UseAutofac()
        .UseSerilog()
        .UseApollo()

        ;
    await builder.AddApplicationAsync<AbpMicroserviceWebGatewayModule>();
    var app = builder.Build();
    app.MapReverseProxy();
    await app.InitializeApplicationAsync();
    await app.RunAsync();
    return 0;
}
catch (Exception ex)
{
    Log.Fatal(ex, $"{assemblyName} terminated unexpectedly!");
    return 1;
}
finally
{
    await Log.CloseAndFlushAsync();
}