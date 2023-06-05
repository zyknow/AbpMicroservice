using AbpMicroservice.SaasService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AbpMicroservice.SaasService;

public abstract class SaasServiceController : AbpControllerBase
{
    protected SaasServiceController()
    {
        LocalizationResource = typeof(SaasServiceResource);
    }
}