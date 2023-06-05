using AbpMicroservice.IdentityService;
using AbpMicroservice.Shared.Definition;
using Serilog.Events;
using Serilog;
using AbpMicroservice.Shared.ConfigurationCenter;

Log.Logger = new LoggerConfiguration()
#if DEBUG
            .MinimumLevel.Debug()
#else
            .MinimumLevel.Information()
#endif
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt"))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

try
{
    Log.Information(
        @$"Starting {AppServiceConsts.AppName}.{AppServiceConsts.IdentityServiceName}.HttpApi.Host.");
    var builder = WebApplication.CreateBuilder(args);
    builder.Host.AddAppSettingsSecretsJson()
        .UseAutofac()
        .UseSerilog()
        .UseApollo()
        ;
    await builder.AddApplicationAsync<IdentityServiceHttpApiHostModule>();
    var app = builder.Build();
    await app.InitializeApplicationAsync();
    await app.RunAsync();
    return 0;
}
catch (Exception ex)
{
    if (ex is HostAbortedException)
        throw;

    Log.Fatal(ex, "Host terminated unexpectedly!");
    return 1;
}
finally
{
    await Log.CloseAndFlushAsync();
}