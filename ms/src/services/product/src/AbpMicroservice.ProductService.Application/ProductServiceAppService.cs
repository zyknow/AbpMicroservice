using System;
using System.Collections.Generic;
using System.Text;
using AbpMicroservice.ProductService.Localization;
using Volo.Abp.Application.Services;

namespace AbpMicroservice.ProductService;

/* Inherit your application services from this class.
 */
public abstract class ProductServiceAppService : ApplicationService
{
    protected ProductServiceAppService()
    {
        LocalizationResource = typeof(ProductServiceResource);
    }
}