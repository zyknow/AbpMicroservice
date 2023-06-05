using AbpMicroservice.Shared.Definition;
using AbpMicroservice.Shared.Hosting.AspNetCore;
using AbpMicroservice.Shared.Hosting.Gateways;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Rewrite;
using Volo.Abp;
using Volo.Abp.Modularity;
using Yarp.ReverseProxy.Configuration;

namespace AbpMicroservice.WebGateway;

[DependsOn(
    typeof(AbpMicroserviceSharedHostingGatewaysModule)
)]
public class AbpMicroserviceWebGatewayModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Enable if you need hosting environment
        // var hostingEnvironment = context.Services.GetHostingEnvironment();
        var configuration = context.Services.GetConfiguration();
        var hostingEnvironment = context.Services.GetHostingEnvironment();

        SwaggerConfigurationHelper.ConfigureWithAuth(
            context: context,
            authority: configuration["AuthServer:Authority"]!,
            scopes: AppServiceConsts.GetAllServiceNameDescDic(),
            apiTitle: "Web Gateway API"
        );
        //ReverseProxy
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

    // 获取 Clusters 配置信息
    private IDictionary<string, string> GetClusters(IConfiguration configuration)
    {
        var clusters = new Dictionary<string, string>();
        var clusterSection = configuration.GetSection("Yarp:Clusters");

        foreach (var routeSection in clusterSection.GetChildren())
        {
            var clusterId = routeSection.Key;

            var url = routeSection.GetSection("Destinations").GetChildren().First()["Address"];


            clusters.Add(clusterId, url);
        }

        return clusters;
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCorrelationId();
        app.UseStaticFiles();
        app.UseCors();
        app.UseSwagger();
        app.UseAbpSwaggerUI(options =>
        {
            var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
            var routes = GetClusters(configuration);

            foreach (var config in routes)
            {
                var url = config.Value;
                options.SwaggerEndpoint($"{url}/swagger/v1/swagger.json", $"{config.Key.ToPascalCase()} API");

                options.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
            }
        });
        app.UseAbpSerilogEnrichers();
        app.UseRewriter(new RewriteOptions()
            // Regex for "", "/" and "" (whitespace)
            .AddRedirect("^(|\\|\\s+)$", "/swagger"));
    }
}