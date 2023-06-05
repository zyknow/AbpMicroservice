using System;

namespace AbpMicroservice.ProductService;

public class ProductServiceTestData
{
    public static Guid IPhoneId { get; } = Guid.NewGuid();

    public static string IPhoneName { get; } = "IPhone 20 pro max";
}
