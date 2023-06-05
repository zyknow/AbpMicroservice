using System.Reflection;
using AbpMicroservice.Shared.Definition;

namespace AbpMicroservice.Shared.Hosting.AspNetCore.Helpers;

public static class AppDomainHelper
{
    public static string GetAppServiceName()
    {
        var entryName = Assembly.GetEntryAssembly()!.GetName().Name!;
        var serviceName = entryName.Replace(@$"{AppServiceConsts.AppName}.", "").Replace(".HttpApi.Host", "");
        return serviceName;
    }
}