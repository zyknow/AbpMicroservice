using AbpMicroservice.AdministrationService.EntityFrameworkCore;
using AbpMicroservice.IdentityService;
using AbpMicroservice.IdentityService.EntityFrameworkCore;
using AbpMicroservice.ProductService.EntityFrameworkCore;
using AbpMicroservice.SaasService.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.TenantManagement;
using Volo.Abp.Uow;

// ReSharper disable TemplateIsNotCompileTimeConstantProblem

namespace AbpMicroservice.DbMigrator;

public class AbpMicroserviceDbMigrationService : ITransientDependency
{
    private readonly ILogger<AbpMicroserviceDbMigrationService> _logger;
    private readonly ITenantRepository _tenantRepository;
    private readonly IDataSeeder _dataSeeder;
    private readonly ICurrentTenant _currentTenant;
    private readonly IUnitOfWorkManager _unitOfWorkManager;

    public AbpMicroserviceDbMigrationService(
        ILogger<AbpMicroserviceDbMigrationService> logger,
        ITenantRepository tenantRepository,
        IDataSeeder dataSeeder,
        ICurrentTenant currentTenant,
        IUnitOfWorkManager unitOfWorkManager)
    {
        _logger = logger;
        _tenantRepository = tenantRepository;
        _dataSeeder = dataSeeder;
        _currentTenant = currentTenant;
        _unitOfWorkManager = unitOfWorkManager;
    }

    public async Task MigrateAsync(CancellationToken cancellationToken)
    {
        await MigrateHostAsync(cancellationToken);
        await MigrateTenantsAsync(cancellationToken);
        _logger.LogInformation("Migration completed!");
    }

    private async Task MigrateHostAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Migrating Host side...");
        await MigrateAllDatabasesAsync(null, cancellationToken);
        await SeedDataAsync();
    }

    private async Task MigrateTenantsAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Migrating tenants...");

        var tenants =
            await _tenantRepository.GetListAsync(includeDetails: true, cancellationToken: cancellationToken);
        var migratedDatabaseSchemas = new HashSet<string>();
        foreach (var tenant in tenants)
            using (_currentTenant.Change(tenant.Id))
            {
                // Database schema migration
                var connectionString = tenant.FindDefaultConnectionString();
                if (!connectionString.IsNullOrWhiteSpace() && //tenant has a separate database
                    !migratedDatabaseSchemas.Contains(connectionString)) //the database was not migrated yet
                {
                    _logger.LogInformation($"Migrating tenant database: {tenant.Name} ({tenant.Id})");
                    await MigrateAllDatabasesAsync(tenant.Id, cancellationToken);
                    migratedDatabaseSchemas.AddIfNotContains(connectionString);
                }

                //Seed data
                _logger.LogInformation($"Seeding tenant data: {tenant.Name} ({tenant.Id})");
                await SeedDataAsync();
            }
    }

    private async Task MigrateAllDatabasesAsync(
        Guid? tenantId,
        CancellationToken cancellationToken)
    {
        using (var uow = _unitOfWorkManager.Begin(true))
        {
            if (tenantId == null)
                /* SaaS schema should only be available in the host side */
                await MigrateDatabaseAsync<SaasServiceDbContext>(cancellationToken);
            await MigrateDatabaseAsync<AdministrationServiceDbContext>(cancellationToken);
            await MigrateDatabaseAsync<IdentityServiceDbContext>(cancellationToken);
            await MigrateDatabaseAsync<ProductServiceDbContext>(cancellationToken);

            await uow.CompleteAsync(cancellationToken);
        }

        _logger.LogInformation(
            $"All databases have been successfully migrated ({(tenantId.HasValue ? $"tenantId: {tenantId}" : "HOST")}).");
    }

    private async Task MigrateDatabaseAsync<TDbContext>(
        CancellationToken cancellationToken)
        where TDbContext : DbContext, IEfCoreDbContext
    {
        _logger.LogInformation($"Migrating {typeof(TDbContext).Name.RemovePostFix("DbContext")} database...");

        var dbContext = await _unitOfWorkManager.Current.ServiceProvider
            .GetRequiredService<IDbContextProvider<TDbContext>>()
            .GetDbContextAsync();

        await dbContext
            .Database
            .MigrateAsync(cancellationToken);
    }

    private async Task SeedDataAsync()
    {
        await _dataSeeder.SeedAsync(
            new DataSeedContext(_currentTenant.Id)
                .WithProperty(IdentityDataSeedContributor.AdminEmailPropertyName,
                    IdentityServiceConsts.DefaultAdminEmailAddress)
                .WithProperty(IdentityDataSeedContributor.AdminPasswordPropertyName,
                    IdentityServiceConsts.DefaultAdminPassword)
        );
    }
}