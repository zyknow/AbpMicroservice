using AbpMicroservice.Shared.Definition;
using Volo.Abp.Autofac;
using Volo.Abp.Data;
using Volo.Abp.Modularity;

namespace AbpMicroservice.Shared.Hosting;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AbpDataModule)
)]
public class AbpMicroserviceSharedHostingModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        ConfigureDatabaseConnections();
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