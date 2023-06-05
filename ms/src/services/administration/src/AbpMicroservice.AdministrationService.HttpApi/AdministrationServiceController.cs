using AbpMicroservice.AdministrationService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AbpMicroservice.AdministrationService;

public abstract class AdministrationServiceController : AbpControllerBase
{
    protected AdministrationServiceController()
    {
        LocalizationResource = typeof(AdministrationServiceResource);
    }
}