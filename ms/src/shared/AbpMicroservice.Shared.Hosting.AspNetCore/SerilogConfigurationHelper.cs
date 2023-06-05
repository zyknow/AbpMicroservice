using AbpMicroservice.Shared.ConfigurationCenter;
using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.Elasticsearch;

namespace AbpMicroservice.Shared.Hosting.AspNetCore;

public static class SerilogConfigurationHelper
{
    public static void Configure(string applicationName)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .UseApollo()
            .AddEnvironmentVariables()
            .Build();

        var logConf = new LoggerConfiguration()
#if DEBUG
           .MinimumLevel.Debug()
#else
                .MinimumLevel.Information()
#endif
           .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
           .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
           .Enrich.FromLogContext()
           .Enrich.WithProperty("Application", $"{applicationName}")
           .WriteTo.Async(c => c.File("Logs/logs.txt"))
           .WriteTo.Async(c => c.Console());

        if (configuration["ElasticSearch:Enabled"]?.To<bool>() == true)
        {
            logConf.WriteTo.Elasticsearch(
                new ElasticsearchSinkOptions(new Uri(configuration["ElasticSearch:Url"]))
                {
                    AutoRegisterTemplate = true,
                    AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv8,
                    IndexFormat = "AbpMicroservice-log-{0:yyyy.MM}",
                    ModifyConnectionSettings = x => x.BasicAuthentication("elastic", "123456")
                });
        }

        Log.Logger = logConf.CreateLogger();
    }
}