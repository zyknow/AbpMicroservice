using AbpMicroservice.AdministrationService.Localization;

namespace AbpMicroservice.AdministrationService;

public abstract class AdministrationServiceAppService : ApplicationService
{
    protected AdministrationServiceAppService()
    {
        LocalizationResource = typeof(AdministrationServiceResource);
    }
}