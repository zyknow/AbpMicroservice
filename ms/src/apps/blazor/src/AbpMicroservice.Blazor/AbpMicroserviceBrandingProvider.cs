using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace AbpMicroservice.Blazor;

[Dependency(ReplaceServices = true)]
public class AbpMicroserviceBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "AbpMicroservice";
}
