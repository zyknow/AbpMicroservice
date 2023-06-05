using AbpMicroservice.Shared.Definition;

namespace AbpMicroservice.SaasService;

public static class SaasServiceConsts
{
    public static string DbTablePrefix { get; set; } = "";

    public static string DbSchema { get; set; } = null;

    public const string ConnectionStringName = AppServiceConsts.SaasServiceName;
}