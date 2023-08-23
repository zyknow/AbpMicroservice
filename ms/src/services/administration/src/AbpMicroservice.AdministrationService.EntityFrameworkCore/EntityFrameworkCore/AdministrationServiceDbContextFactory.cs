using Microsoft.EntityFrameworkCore.Design;
using AbpMicroservice.Shared.EntityFrameworkCore;

namespace AbpMicroservice.AdministrationService.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class AdministrationServiceDbContextFactory : IDesignTimeDbContextFactory<AdministrationServiceDbContext>
{
    public AdministrationServiceDbContext CreateDbContext(string[] args)
    {
        AdministrationServiceEfCoreEntityExtensionMappings.Configure();

        var builder =
            DbContextHelper.GetDbContextBuilder<AdministrationServiceDbContext>(AdministrationServiceConsts
                .ConnectionStringName);

        return new AdministrationServiceDbContext(builder.Options);
    }
}