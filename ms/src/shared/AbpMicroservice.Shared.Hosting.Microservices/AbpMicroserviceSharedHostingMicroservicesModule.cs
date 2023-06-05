using System.Reflection;
using Medallion.Threading;
using Medallion.Threading.Redis;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using AbpMicroservice.SaasService.EntityFrameworkCore;
using AbpMicroservice.Shared.Definition;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice.Shared.Hosting.AspNetCore.Helpers;
using AbpMicroservice.Shared.Hosting.Microservices.DbMigrations;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using Volo.Abp;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.BackgroundJobs.RabbitMQ;
using Volo.Abp.Caching;
using Volo.Abp.Caching.StackExchangeRedis;
using Volo.Abp.DistributedLocking;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.AspNetCore;

namespace AbpMicroservice.Shared.Hosting.Microservices;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingAspNetCoreModule),
    typeof(AbpBackgroundJobsRabbitMqModule),
    typeof(AbpAspNetCoreMultiTenancyModule),
    typeof(AbpDistributedLockingModule),
    typeof(AbpCachingStackExchangeRedisModule),
    typeof(SaasServiceEntityFrameworkCoreModule),
    typeof(AdministrationServiceEntityFrameworkCoreModule)
)]
public class AbpMicroserviceSharedHostingMicroservicesModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        var hostingEnvironment = context.Services.GetHostingEnvironment();
        var serviceName = AppDomainHelper.GetAppServiceName();
        

        Configure<AbpDistributedCacheOptions>(options => { options.KeyPrefix = @$"{AppServiceConsts.AppName}:"; });

        var redis = ConnectionMultiplexer.Connect(configuration["Redis:Configuration"]);

        context.Services
            .AddDataProtection()
            .SetApplicationName(AppServiceConsts.AppName)
            .PersistKeysToStackExchangeRedis(redis, @$"{AppServiceConsts.AppName}-Protection-Keys");

        context.Services.AddSingleton<IDistributedLockProvider>(_ =>
            new RedisDistributedSynchronizationProvider(redis.GetDatabase()));

        if (hostingEnvironment.IsDevelopment()) IdentityModelEventSource.ShowPII = true;

        SwaggerConfiguration(context, configuration, serviceName);
        JwtBearerConfigurationHelper.Configure(context, serviceName);
        ConfigureConventionalControllers();
        CorsConfiguration(context, configuration);
    }

    private void CorsConfiguration(ServiceConfigurationContext context, IConfiguration configuration)
    {
        context.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                    .WithOrigins(
                        configuration["App:CorsOrigins"]?
                            .Split(",", StringSplitOptions.RemoveEmptyEntries)
                            .Select(o => o.Trim().RemovePostFix("/"))
                            .ToArray() ?? Array.Empty<string>()
                    )
                    .WithAbpExposedHeaders()
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
    }


    private void SwaggerConfiguration(ServiceConfigurationContext context, IConfiguration configuration,
        string serviceName)
    {
        SwaggerConfigurationHelper.ConfigureWithAuth(
            context,
            configuration["AuthServer:Authority"]!,
            AppServiceConsts.GetAllServiceNameDescDic().ToDictionary(x=> x.Key, x=> ""),
            $@"{serviceName ?? AppServiceConsts.AppName} API"
        );
    }


    private void ConfigureConventionalControllers()
    {
        var applicationModule = AppDomain.CurrentDomain.GetAssemblies().SelectMany(a => a.GetTypes())
            .FirstOrDefault(IsApplicationModule);

        if (applicationModule != null)
            Configure<AbpAspNetCoreMvcOptions>(options =>
            {
                options.ConventionalControllers.Create(applicationModule.Assembly);
            });
    }

    private bool IsApplicationModule(Type type)
    {
        return type.Name.EndsWith("ApplicationModule") &&
               type.Namespace?.Contains(AppServiceConsts.AppName) == true &&
               type.IsSubclassOf(typeof(AbpModule));
    }
}