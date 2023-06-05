using AbpMicroservice.IdentityService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AbpMicroservice.IdentityService;

public abstract class IdentityServiceController : AbpControllerBase
{
    protected IdentityServiceController()
    {
        LocalizationResource = typeof(IdentityServiceResource);
    }
}