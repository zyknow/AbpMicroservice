using AbpMicroservice.Shared.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AbpMicroservice.ProductService.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class ProductServiceDbContextFactory : IDesignTimeDbContextFactory<ProductServiceDbContext>
{
    public ProductServiceDbContext CreateDbContext(string[] args)
    {
        var builder =
            DbContextHelper.GetDbContextBuilder<ProductServiceDbContext>(ProductServiceConsts
                .ConnectionStringName);

        return new ProductServiceDbContext(builder.Options);
    }
}