using Volo.Abp.Settings;

namespace AbpMicroservice.ProductService.Settings;

public class ProductServiceSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(ProductServiceSettings.MySetting1));
    }
}