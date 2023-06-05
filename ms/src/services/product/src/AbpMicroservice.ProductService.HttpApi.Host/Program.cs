using AbpMicroservice.ProductService;
using AbpMicroservice.Shared.ConfigurationCenter;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using Serilog;

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
    await builder.AddApplicationAsync<ProductServiceHttpApiHostModule>();
    var app = builder.Build();

    var enabled = app.Configuration.GetSection("Jaeger:Enabled").Get<bool>();

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