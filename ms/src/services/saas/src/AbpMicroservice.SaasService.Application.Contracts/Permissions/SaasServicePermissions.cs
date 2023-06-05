using AbpMicroservice.Shared.Definition;
using Volo.Abp.Reflection;

namespace AbpMicroservice.SaasService.Permissions;

public static class SaasServicePermissions
{
    public const string GroupName = AppServiceConsts.SaasServiceName;

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";

    public static string[] GetAll()
    {
        return ReflectionHelper.GetPublicConstantsRecursively(typeof(SaasServicePermissions));
    }
}