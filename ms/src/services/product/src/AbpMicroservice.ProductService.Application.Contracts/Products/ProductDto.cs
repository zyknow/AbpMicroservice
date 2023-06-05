using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Data;
using Volo.Abp.Domain.Entities;

namespace AbpMicroservice.ProductService.Products;

public class ProductDto : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp, IHasExtraProperties
{
    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Price { get; set; }
    public string ConcurrencyStamp { get; set; }
    public ExtraPropertyDictionary ExtraProperties { get; }
}