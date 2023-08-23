using System.Text.Json;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;

namespace AbpMicroservice.IdentityService.EventHandler;

public class TenantCreatedEventHandler : IDistributedEventHandler<TenantCreatedEto>, ITransientDependency
{
    private readonly ICurrentTenant _currentTenant;
    private readonly ILogger<TenantCreatedEventHandler> _logger;
    private readonly IIdentityDataSeeder _identityDataSeeder;

    public TenantCreatedEventHandler(
        ICurrentTenant currentTenant,
        IIdentityDataSeeder identityDataSeeder,
        ILogger<TenantCreatedEventHandler> logger)
    {
        _currentTenant = currentTenant;
        _identityDataSeeder = identityDataSeeder;
        _logger = logger;
    }

    public async Task HandleEventAsync(TenantCreatedEto eventData)
    {
        try
        {
            using (_currentTenant.Change(eventData.Id))
            {
                _logger.LogInformation($"Creating admin user for tenant {eventData.Id}...");
                IdentityDataSeedResult res = await _identityDataSeeder.SeedAsync(
                    eventData.Properties.GetOrDefault(IdentityDataSeedContributor.AdminEmailPropertyName) ??
                    IdentityServiceConsts.DefaultAdminEmailAddress,
                    eventData.Properties.GetOrDefault(IdentityDataSeedContributor.AdminPasswordPropertyName) ??
                    IdentityServiceConsts.DefaultAdminPassword,
                    eventData.Id
                );

                _logger.LogInformation($"Create {JsonSerializer.Serialize(res)} ");
            }
        }
        catch (Exception ex)
        {
            await HandleErrorTenantCreatedAsync(eventData, ex);
        }
    }

    private Task HandleErrorTenantCreatedAsync(TenantCreatedEto eventData, Exception ex)
    {
        _logger.LogError(@$"{ex}");
        throw new NotImplementedException();
    }
}