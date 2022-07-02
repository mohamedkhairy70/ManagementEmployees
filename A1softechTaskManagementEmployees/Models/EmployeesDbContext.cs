using Microsoft.EntityFrameworkCore;

namespace A1softechTaskManagementEmployees.Models
{
    public class EmployeesDbContext: DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeTaxs> EmployeeTaxs { get; set; }
        public EmployeesDbContext(DbContextOptions<EmployeesDbContext> options) 
            : base(options) => Database.Migrate();
    }
}
