using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace AbpMicroservice.SaasService.EntityFrameworkCore;

[ConnectionStringName(SaasServiceConsts.ConnectionStringName)]
public interface ISaasServiceDbContext : IEfCoreDbContext
{
    /* Add DbSet for each Aggregate Root here. Example:
     * DbSet<Question> Questions { get; }
     */
}