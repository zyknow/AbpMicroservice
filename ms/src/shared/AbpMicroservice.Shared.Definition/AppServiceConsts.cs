namespace AbpMicroservice.Shared.Definition;

public static class AppServiceConsts
{
    public const string AppName = "AbpMicroservice";

    public const string AdministrationServiceName = "AdministrationService";
    public const string AdministrationServiceDisplayName = "Administration Service";

    public const string IdentityServiceName = "IdentityService";
    public const string IdentityServiceDisplayName = "Identity Service";

    public const string SaasServiceName = "SaasService";
    public const string SaasServiceDisplayName = "Saas Service";

    public const string ProductServiceName = "ProductService";
    public const string ProductServiceDisplayName = "Product Service";

    public const string AccountServiceName = "AccountService";
    public const string AccountServiceDisplayName = "Account Service";

    public static Dictionary<string, string> GetAllServiceNameDescDic()
    {
        return new Dictionary<string, string>()
        {
            {AdministrationServiceName, AdministrationServiceDisplayName},
            {IdentityServiceName, IdentityServiceDisplayName},
            {SaasServiceName, SaasServiceDisplayName},
            {ProductServiceName, ProductServiceDisplayName},
            {AccountServiceName, AccountServiceDisplayName},
        };
    }

    public static string[] GetAllServiceNames()
    {
        return GetAllServiceNameDescDic().Select(dic=> dic.Key).ToArray();
    }
}