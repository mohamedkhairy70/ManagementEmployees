using System.ComponentModel.DataAnnotations;

namespace A1softechTaskManagementEmployees.ViewModels
{
    public class VMEmployee
    {
        public Guid ID { get; set; } = new Guid();
        public string Name { get; set; }
        public string Mobile { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public float Salary { get; set; }
        public List<VMEmployeeTaxs> EmployeeTaxs { get; set; } = new();
    }
}
