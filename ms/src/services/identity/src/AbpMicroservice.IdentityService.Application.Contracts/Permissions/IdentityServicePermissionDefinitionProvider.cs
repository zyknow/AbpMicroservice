using AbpMicroservice.IdentityService.Localization;
using AbpMicroservice.Shared.Definition;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AbpMicroservice.IdentityService.Permissions;

public class IdentityServicePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(IdentityServicePermissions.GroupName,
            L(@$"Permission:{AppServiceConsts.IdentityServiceName}"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(IdentityServicePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<IdentityServiceResource>(name);
    }
}