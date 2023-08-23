using Microsoft.EntityFrameworkCore.Design;
using AbpMicroservice.Shared.EntityFrameworkCore;

namespace AbpMicroservice.IdentityService.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class IdentityServiceDbContextFactory : IDesignTimeDbContextFactory<IdentityServiceDbContext>
{
    public IdentityServiceDbContext CreateDbContext(string[] args)
    {
        var builder =
            DbContextHelper.GetDbContextBuilder<IdentityServiceDbContext>(IdentityServiceConsts
                .ConnectionStringName);

        return new IdentityServiceDbContext(builder.Options);
    }
}