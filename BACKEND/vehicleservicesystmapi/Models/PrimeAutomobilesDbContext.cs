using Microsoft.EntityFrameworkCore;

namespace vehicleservicesystmapi.Models
    
{
    public class PrimeAutomobilesDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ServiceRepresentative> ServiceRepresentatives { get; set; }
        public DbSet<WorkItem> WorkItems { get; set; }
        public DbSet<ServiceRecord> ServiceRecords { get; set; }
        public DbSet<BillOfMaterial> BillOfMaterials { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=BAE\SQLEXPRESS;Initial Catalog=PrimeAutomobilesDB;Integrated Security=True;Encrypt=True;Trust Server Certificate=True;");
        }
    }
}
