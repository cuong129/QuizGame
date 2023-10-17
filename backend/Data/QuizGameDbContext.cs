using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace QuizGame.Data;

public class QuizGameDbContext : IdentityDbContext
{
    public QuizGameDbContext(DbContextOptions<QuizGameDbContext> options)
        : base(options)
    {
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<Topic> Topics { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Question table
        modelBuilder.Entity<Question>()
            .ToTable("Questions")
            .HasKey(p => p.Id);
        modelBuilder.Entity<Question>()
            .Property(p => p.Request)
            .IsRequired();
        modelBuilder.Entity<Question>()
            .Property(p => p.Type)
            .IsRequired();
        modelBuilder.Entity<Question>()
            .Property(p => p.SchoolLevel)
            .IsRequired();

        // Topic table
        modelBuilder.Entity<Topic>()
            .ToTable("Topics")
            .HasKey(p => p.Id);

        modelBuilder.Entity<Topic>()
            .Property(p => p.Name)
            .IsRequired();
        modelBuilder.Entity<Topic>()
            .Property(p => p.Type)
            .IsRequired();
        modelBuilder.Entity<Topic>()
            .Property(p => p.SchoolLevel)
            .IsRequired();
    }
}
