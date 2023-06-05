using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace AbpMicroservice.ProductService.Products;

public class Product : FullAuditedAggregateRoot<Guid>
{
    public Product(Guid id, string name) : base(id)
    {
        this.Name = name;
    }

    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Price { get; set; }
}