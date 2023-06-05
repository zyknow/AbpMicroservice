using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace AbpMicroservice.Shared.Hosting.Microservices;

public static class JwtBearerConfigurationHelper
{
    public static void Configure(
        ServiceConfigurationContext context,
        string audience)
    {
        var configuration = context.Services.GetConfiguration();

        context.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = configuration["AuthServer:Authority"];
                options.RequireHttpsMetadata = Convert.ToBoolean(configuration["AuthServer:RequireHttpsMetadata"]);
                options.Audience = audience;
            });
    }
}