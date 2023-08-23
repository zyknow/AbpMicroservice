using AbpMicroservice.IdentityService.EntityFrameworkCore;
using AbpMicroservice.Shared.Hosting.Microservices;
using Prometheus;
using AbpMicroservice.Shared.Definition;
using Volo.Abp;
using Volo.Abp.Modularity;

namespace AbpMicroservice.IdentityService;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingMicroservicesModule),
    typeof(IdentityServiceEntityFrameworkCoreModule),
    typeof(IdentityServiceApplicationModule),
    typeof(IdentityServiceHttpApiModule)
)]
public class IdentityServiceHttpApiHostModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        var hostingEnvironment = context.Services.GetHostingEnvironment();

        ConfigureExternalProviders(context);
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

        app.UseCorrelationId();
        app.UseAbpRequestLocalization();
        app.UseAbpSecurityHeaders();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseHttpMetrics();


        app.Use(async (context, next) =>
        {
            Console.WriteLine("请求token如下：");
            Console.WriteLine(context.Request.Headers.Authorization);
            await next.Invoke();
        });

        app.UseAuthentication();
        app.UseAbpClaimsMap();
        app.UseMultiTenancy();
        app.UseAuthorization();
        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
            options.SwaggerEndpoint("/swagger/v1/swagger.json", @$"{AppServiceConsts.IdentityServiceDisplayName} API");
            options.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
        });
        app.UseAbpSerilogEnrichers();
        app.UseAuditing();
        app.UseUnitOfWork();
        app.UseConfiguredEndpoints(endpoints => { endpoints.MapMetrics(); });
    }

    private void ConfigureExternalProviders(ServiceConfigurationContext context)
    {
        //context.Services
        //.AddDynamicExternalLoginProviderOptions<GoogleOptions>(
        //    GoogleDefaults.AuthenticationScheme,
        //    options =>
        //    {
        //        options.WithProperty(x => x.ClientId);
        //        options.WithProperty(x => x.ClientSecret, isSecret: true);
        //    }
        //)
        //.AddDynamicExternalLoginProviderOptions<MicrosoftAccountOptions>(
        //    MicrosoftAccountDefaults.AuthenticationScheme,
        //    options =>
        //    {
        //        options.WithProperty(x => x.ClientId);
        //        options.WithProperty(x => x.ClientSecret, isSecret: true);
        //    }
        //)
        //.AddDynamicExternalLoginProviderOptions<TwitterOptions>(
        //    TwitterDefaults.AuthenticationScheme,
        //    options =>
        //    {
        //        options.WithProperty(x => x.ConsumerKey);
        //        options.WithProperty(x => x.ConsumerSecret, isSecret: true);
        //    }
        //);
    }
}