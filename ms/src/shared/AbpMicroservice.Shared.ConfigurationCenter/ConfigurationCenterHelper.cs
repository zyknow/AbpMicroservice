using AbpMicroservice.Shared.Definition;
using Com.Ctrip.Framework.Apollo;
using Microsoft.Extensions.Configuration;

namespace AbpMicroservice.Shared.ConfigurationCenter;

public class ConfigurationCenterHelper
{
    public static IApolloOptions GetApolloOptions()
    {
        var appsettingsBuilder = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();
        
        var apolloOptions = appsettingsBuilder.GetSection(AppGlobalConsts.ConfigurationCenter).Get<ApolloOptions>();
        return apolloOptions;
    }

}