using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace AbpMicroservice.ProductService.EntityFrameworkCore;

[ConnectionStringName(ProductServiceConsts.ConnectionStringName)]
public interface IProductServiceDbContext : IEfCoreDbContext
{
}