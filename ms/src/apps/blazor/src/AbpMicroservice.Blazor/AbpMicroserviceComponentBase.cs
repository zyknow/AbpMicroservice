using AbpMicroservice.Shared.Localization.Localization;
using Volo.Abp.AspNetCore.Components;

namespace AbpMicroservice.Blazor;

public abstract class AbpMicroserviceComponentBase : AbpComponentBase
{
    protected AbpMicroserviceComponentBase()
    {
        LocalizationResource = typeof(AbpMicroserviceResource);
    }
}
