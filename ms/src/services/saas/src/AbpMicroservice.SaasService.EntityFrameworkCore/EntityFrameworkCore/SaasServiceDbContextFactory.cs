using Microsoft.EntityFrameworkCore.Design;
using AbpMicroservice.Shared.EntityFrameworkCore;

namespace AbpMicroservice.SaasService.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class SaasServiceDbContextFactory : IDesignTimeDbContextFactory<SaasServiceDbContext>
{
    public SaasServiceDbContext CreateDbContext(string[] args)
    {
        var builder =
            DbContextHelper.GetDbContextBuilder<SaasServiceDbContext>(SaasServiceConsts
                .ConnectionStringName);

        return new SaasServiceDbContext(builder.Options);
    }
}