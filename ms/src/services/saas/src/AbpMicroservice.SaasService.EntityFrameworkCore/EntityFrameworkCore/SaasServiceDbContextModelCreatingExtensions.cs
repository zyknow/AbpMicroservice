namespace AbpMicroservice.SaasService.EntityFrameworkCore;

public static class SaasServiceDbContextModelCreatingExtensions
{
//     public static void ConfigureSaas(
//        this ModelBuilder builder)
//     {
//         Check.NotNull(builder, nameof(builder));
//
//         /* Configure all entities here. Example:
//
//         builder.Entity<Question>(b =>
//         {
//             //Configure table & schema name
//             b.ToTable(SaaSDbProperties.DbTablePrefix + "Questions", SaaSDbProperties.DbSchema);
//
//             b.ConfigureByConvention();
//
//             //Properties
//             b.Property(q => q.Title).IsRequired().HasMaxLength(QuestionConsts.MaxTitleLength);
//
//             //Relations
//             b.HasMany(question => question.Tags).WithOne().HasForeignKey(qt => qt.QuestionId);
//
//             //Indexes
//             b.HasIndex(q => q.CreationTime);
//         });
//         */
//     }
}