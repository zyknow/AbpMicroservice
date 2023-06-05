using AbpMicroservice.SaasService.Localization;
using AbpMicroservice.Shared.Definition;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AbpMicroservice.SaasService.Permissions;

public class SaasServicePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(SaasServicePermissions.GroupName,
            L(@$"Permission:{AppServiceConsts.SaasServiceName}"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(SaasServicePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<SaasServiceResource>(name);
    }
}