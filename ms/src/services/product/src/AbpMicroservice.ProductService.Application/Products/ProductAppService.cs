using System;
using Volo.Abp.Application.Services;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Repositories;

namespace AbpMicroservice.ProductService.Products;

public class ProductAppService : CrudAppService<Product, ProductDto, Guid>
{
    public ProductAppService(IRepository<Product, Guid> repository) : base(repository)
    {
    }
}