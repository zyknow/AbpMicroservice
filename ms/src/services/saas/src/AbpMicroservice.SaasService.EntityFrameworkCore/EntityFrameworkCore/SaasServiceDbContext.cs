using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace AbpMicroservice.SaasService.EntityFrameworkCore;

[ConnectionStringName(SaasServiceConsts.ConnectionStringName)]
public class SaasServiceDbContext :
    AbpDbContext<SaasServiceDbContext>,
    ISaasServiceDbContext,
    ITenantManagementDbContext
{
    public SaasServiceDbContext(DbContextOptions<SaasServiceDbContext> options)
        : base(options)
    {
    }

    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigureTenantManagement();
        // builder.ConfigureSaas();
        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(SaasServiceConsts.DbTablePrefix + "YourEntities", SaasServiceConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
    }
}