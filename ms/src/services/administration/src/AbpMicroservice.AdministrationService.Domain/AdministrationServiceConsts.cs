using AbpMicroservice.Shared.Definition;

namespace AbpMicroservice.AdministrationService;

public static class AdministrationServiceConsts
{
    public static string DbTablePrefix { get; set; } = "";

    public static string DbSchema { get; set; } = null;

    public const string ConnectionStringName = AppServiceConsts.AdministrationServiceName;
}