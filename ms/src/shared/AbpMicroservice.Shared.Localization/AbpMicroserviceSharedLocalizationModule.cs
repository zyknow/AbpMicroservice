using AbpMicroservice.Shared.Definition;
using AbpMicroservice.Shared.Localization.Localization;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.Validation;
using Volo.Abp.Validation.Localization;
using Volo.Abp.VirtualFileSystem;

namespace AbpMicroservice.Shared.Localization;

[DependsOn(
    typeof(AbpValidationModule)
)]
public class AbpMicroserviceSharedLocalizationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<AbpMicroserviceSharedLocalizationModule>();
        });

        Configure<AbpLocalizationOptions>(options =>
        {
            options.Languages.Add(new LanguageInfo("zh-Hans", "zh-Hans", "简体中文"));
            options.Languages.Add(new LanguageInfo("en", "en", "English"));



            options.Resources
                .Add<AbpMicroserviceResource>("en")
                .AddBaseTypes(
                    typeof(AbpValidationResource)
                ).AddVirtualJson(@$"/Localization/{AppServiceConsts.AppName}");

            options.DefaultResourceType = typeof(AbpMicroserviceResource);
        });
    }
}