using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using smartQueue.Core.Entities;

namespace smartQueue.Infrastructure
{
    public class ApplicationDbContext(IConfiguration configuration) : DbContext
    {
        protected readonly IConfiguration _configuration = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(_configuration.GetConnectionString("SmartQueue_db"));
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().ToTable("Orders");
            modelBuilder.Entity<OrderItem>().ToTable("OrderItems");
            modelBuilder.Entity<Product>().ToTable("Products");
        }
    }
}
