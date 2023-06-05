using AbpMicroservice.SaasService.Localization;
using Volo.Abp.Application.Services;

namespace AbpMicroservice.SaasService;

public abstract class SaasServiceAppService : ApplicationService
{
    protected SaasServiceAppService()
    {
        LocalizationResource = typeof(SaasServiceResource);
    }
}