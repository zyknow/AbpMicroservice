using AbpMicroservice.Shared.Definition;

namespace AbpMicroservice.IdentityService;

public static class IdentityServiceConsts
{
    public static string DbTablePrefix { get; set; } = "";

    public static string DbSchema { get; set; } = null;

    public const string ConnectionStringName = AppServiceConsts.IdentityServiceName;

    public const string DefaultAdminEmailAddress = "admin@abp.io";

    public const string DefaultAdminPassword = "1q2w3E*";
}