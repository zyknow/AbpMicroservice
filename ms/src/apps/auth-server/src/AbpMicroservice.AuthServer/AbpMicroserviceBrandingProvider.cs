using AbpMicroservice.Shared.Definition;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace AbpMicroservice;

[Dependency(ReplaceServices = true)]
public class AbpMicroserviceBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => AppServiceConsts.AppName;

}