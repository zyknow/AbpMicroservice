using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace AbpMicroservice.IdentityService.EntityFrameworkCore;

[ConnectionStringName(IdentityServiceConsts.ConnectionStringName)]
public interface IIdentityServiceDbContext : IEfCoreDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * DbSet<Question> Questions { get; }
     */
}