using Shouldly;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Guids;
using Xunit;

namespace AbpMicroservice.ProductService.Products;
public class ProductAppService_Tests : ProductServiceApplicationTestBase
{
    private readonly ProductAppService _productAppService;
    private readonly IGuidGenerator _guidGenerator;
    public ProductAppService_Tests()
    {
        _productAppService = GetRequiredService<ProductAppService>();
        _guidGenerator = GetRequiredService<IGuidGenerator>();
    }

    [Fact]
    public async Task Get_Products()
    {
        var result = await _productAppService.GetListAsync(new PagedAndSortedResultRequestDto()
        {
        });
        result.Items.ShouldContain(q => q.Name == ProductServiceTestData.IPhoneName);
    }

    [Fact]
    public async Task Get_Product_ById()
    {
        var result = await _productAppService.GetAsync(ProductServiceTestData.IPhoneId);
        result.ShouldNotBeNull();
    }

    [Fact]
    public async Task Update_Product_ById()
    {
        var product = await _productAppService.GetAsync(ProductServiceTestData.IPhoneId);
        var productUpdateDto = new ProductDto
        {
            Name = "new IPhone",
        };

        var updatedProduct = await _productAppService.UpdateAsync(ProductServiceTestData.IPhoneId, productUpdateDto);
        updatedProduct.Name.ShouldBe("new IPhone");
    }

    [Fact]
    public async Task Create_Product()
    {
        var watch = new ProductDto
        {
            Name = "IPhone watch",
        };
        var createdProduct = await _productAppService.CreateAsync(watch);
        createdProduct.Name.ShouldBe("IPhone watch");
    }
    [Fact]
    public async Task Delete_Product()
    {
        await _productAppService.DeleteAsync(ProductServiceTestData.IPhoneId);
        var products = await _productAppService.GetListAsync(new PagedAndSortedResultRequestDto());
        products.Items.ShouldBeEmpty();
    }
}
