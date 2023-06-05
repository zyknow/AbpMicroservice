using AbpMicroservice.Shared.Definition;

namespace AbpMicroservice.ProductService;

public class ProductServiceConsts
{
    public static string DbTablePrefix { get; set; } = "";

    public static string DbSchema { get; set; } = null;

    public const string ConnectionStringName = AppServiceConsts.ProductServiceName;
}