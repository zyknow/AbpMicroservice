using AbpMicroservice.Shared.ConfigurationCenter;
using AbpMicroservice.Shared.Definition;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AbpMicroservice.Shared.EntityFrameworkCore;

public class DbContextHelper
{
    public static DbContextOptionsBuilder<TDbContext> GetDbContextBuilder<TDbContext>(string connectionString)
        where TDbContext : Volo.Abp.EntityFrameworkCore.AbpDbContext<TDbContext>
    {
        var configuration = BuildConfiguration(connectionString);
        var builder = new DbContextOptionsBuilder<TDbContext>()
            .UseNpgsql(GetConnectionStringFromConfiguration(connectionString));
        return builder;
    }

    private static string GetConnectionStringFromConfiguration(string connectionStringName)
    {
        return BuildConfiguration(connectionStringName)
            .GetConnectionString(connectionStringName);
    }

    private static IConfigurationRoot BuildConfiguration(string projectName)
    {
        var builder = new ConfigurationBuilder()
                .SetBasePath(
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        @$"..{Path.DirectorySeparatorChar}{AppServiceConsts.AppName}.{projectName}.HttpApi.Host"
                    )
                )
                .UseApollo()

            ;

        return builder.Build();
    }
}