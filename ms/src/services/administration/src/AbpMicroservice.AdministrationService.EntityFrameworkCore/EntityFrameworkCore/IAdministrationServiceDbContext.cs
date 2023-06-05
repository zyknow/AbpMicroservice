using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace AbpMicroservice.AdministrationService.EntityFrameworkCore;

[ConnectionStringName(AdministrationServiceConsts.ConnectionStringName)]
public interface IAdministrationServiceDbContext : IEfCoreDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * DbSet<Question> Questions { get; }
     */
}