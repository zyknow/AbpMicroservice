using AbpMicroservice.ProductService.Products;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace AbpMicroservice.ProductService;

public class ProductServiceTestDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<Product> _productRepository;

    public ProductServiceTestDataSeedContributor(IRepository<Product> productRepository)
    {
        this._productRepository = productRepository;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        /* Seed additional test data... */
        var tv = new Product(ProductServiceTestData.IPhoneId, ProductServiceTestData.IPhoneName);
        await _productRepository.InsertAsync(tv);
    }


}