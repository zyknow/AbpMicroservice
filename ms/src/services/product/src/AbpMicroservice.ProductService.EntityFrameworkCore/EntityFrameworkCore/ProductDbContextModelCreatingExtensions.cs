using AbpMicroservice.ProductService.Products;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace AbpMicroservice.ProductService.EntityFrameworkCore;

public static class ProductDbContextModelCreatingExtensions
{
    public static void ConfigureProduct(
        this ModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));

        builder.Entity<Product>(b =>
        {
            //Configure table & schema name
            b.ToTable(ProductServiceConsts.DbTablePrefix + "Products", ProductServiceConsts.DbSchema);
            b.ConfigureByConvention();
        });
    }
}