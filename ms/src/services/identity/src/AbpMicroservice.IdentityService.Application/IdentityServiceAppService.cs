using AbpMicroservice.IdentityService.Localization;
using Volo.Abp.Application.Services;

namespace AbpMicroservice.IdentityService;

public abstract class IdentityServiceAppService : ApplicationService
{
    protected IdentityServiceAppService()
    {
        LocalizationResource = typeof(IdentityServiceResource);
    }
}