using System.Text.Json;
using AbpMicroservice.Shared.Definition;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.BlobStoring;
using Volo.Abp.BlobStoring.Minio;
using Volo.Abp.Data;
using Volo.Abp.Modularity;

namespace AbpMicroservice.Shared.Hosting;

[DependsOn(
    typeof(AbpBlobStoringMinioModule),
    typeof(AbpAutofacModule),
    typeof(AbpDataModule)
)]
public class AbpMicroserviceSharedHostingModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        ConfigureDatabaseConnections();
        ConfigureBlobStoring(configuration);
    }

    private void ConfigureBlobStoring(IConfiguration configuration)
    {
        Configure<AbpBlobStoringOptions>(options =>
        {
            options.Containers.ConfigureDefault(container =>
            {
                container.UseMinio(minio =>
                {
                    minio.EndPoint = configuration.GetSection("Minio:EndPoint").Get<string>();
                    minio.AccessKey = configuration.GetSection("Minio:AccessKey").Get<string>();
                    minio.SecretKey = configuration.GetSection("Minio:SecretKey").Get<string>();
                    minio.BucketName = configuration.GetSection("Minio:BucketName").Get<string>();
                    minio.WithSSL = configuration.GetSection("Minio:WithSSL").Get<bool>();
                    minio.CreateBucketIfNotExists =
                        configuration.GetSection("Minio:CreateBucketIfNotExists").Get<bool>();
                });
                container.IsMultiTenant = true;
            });
        });
    }


    private void ConfigureDatabaseConnections()
    {
        Configure<AbpDbConnectionOptions>(options =>
        {
            options.Databases.Configure(AppServiceConsts.SaasServiceName, database =>
            {
                database.MappedConnections.Add("AbpTenantManagement");
                database.IsUsedByTenants = false;
            });

            options.Databases.Configure(AppServiceConsts.AdministrationServiceName, database =>
            {
                database.MappedConnections.Add("AbpAuditLogging");
                database.MappedConnections.Add("AbpPermissionManagement");
                database.MappedConnections.Add("AbpSettingManagement");
                database.MappedConnections.Add("AbpFeatureManagement");
            });

            options.Databases.Configure(AppServiceConsts.IdentityServiceName, database =>
            {
                database.MappedConnections.Add("AbpIdentity");
                database.MappedConnections.Add("AbpOpenIddict");
            });

            options.Databases.Configure(AppServiceConsts.ProductServiceName,
                database => { database.MappedConnections.Add(AppServiceConsts.ProductServiceName); });
        });
    }
}