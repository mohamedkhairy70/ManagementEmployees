using System.ComponentModel.DataAnnotations;

namespace A1softechTaskManagementEmployees.Models
{
    public class Employee
    {
        public Guid ID { get; set; } = new Guid();
        public string Name { get; set; }
        public string Mobile { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public float Salary { get; set; }
        public List<EmployeeTaxs> EmployeeTaxs { get; set; } = new();

        //public float NetSalary { 
        //    get {
        //        return
        //            Salary - (EmployeeTaxs?.Select(x => new { Net = Salary * x.Tax / 100 }).Sum(x=>x.Net)??0);
        //    } 
        //}

    }
}
