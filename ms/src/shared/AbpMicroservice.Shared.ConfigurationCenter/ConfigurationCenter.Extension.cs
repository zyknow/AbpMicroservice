using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace AbpMicroservice.Shared.ConfigurationCenter;

public static class ConfigurationCenterExtension
{
    public static IHostBuilder UseApollo(this IHostBuilder builder)
    {
        return builder
            .ConfigureAppConfiguration((_, config) =>
            {
#if !DEBUG
                config
                    .AddApollo(ConfigurationCenterHelper.GetApolloOptions())
                    ;
#endif
            });
    }

    public static IConfigurationBuilder UseApollo(this IConfigurationBuilder builder)
    {
        builder
#if !DEBUG
        .AddApollo(ConfigurationCenterHelper.GetApolloOptions())
#else 
    .AddJsonFile("appsettings.json")

#endif
            ;

        return builder;

    }
}