using AbpMicroservice.ProductService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AbpMicroservice.ProductService;

/* Inherit your controllers from this class.
 */
public abstract class ProductServiceController : AbpControllerBase
{
    protected ProductServiceController()
    {
        LocalizationResource = typeof(ProductServiceResource);
    }
}