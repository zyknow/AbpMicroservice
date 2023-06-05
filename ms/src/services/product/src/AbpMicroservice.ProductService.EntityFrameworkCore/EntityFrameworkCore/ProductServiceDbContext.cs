using AbpMicroservice.ProductService.Products;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace AbpMicroservice.ProductService.EntityFrameworkCore;

[ConnectionStringName(ProductServiceConsts.ConnectionStringName)]
public class ProductServiceDbContext :
    AbpDbContext<ProductServiceDbContext>,
    IProductServiceDbContext
{
    public DbSet<Product> Products { get; set; }

    public ProductServiceDbContext(DbContextOptions<ProductServiceDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigureProduct();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(ProductServiceConsts.DbTablePrefix + "YourEntities", ProductServiceConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
    }
}