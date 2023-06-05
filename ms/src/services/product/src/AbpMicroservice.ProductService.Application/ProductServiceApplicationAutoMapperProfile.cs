using AbpMicroservice.ProductService.Products;
using AutoMapper;

namespace AbpMicroservice.ProductService;

public class ProductServiceApplicationAutoMapperProfile : Profile
{
    public ProductServiceApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}