using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice;
using Serilog;
using AbpMicroservice.Shared.ConfigurationCenter;

var assemblyName = typeof(Program).Assembly.GetName().Name;

SerilogConfigurationHelper.Configure(assemblyName!);

try
{
    Log.Information($"Starting {assemblyName}.");
    var builder = WebApplication.CreateBuilder(args);
    builder.Host
        .AddAppSettingsSecretsJson()
        .UseAutofac()
        .UseSerilog()
        .UseApollo()
        ;
    await builder.AddApplicationAsync<AbpMicroserviceAuthServerModule>();
    var app = builder.Build();
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