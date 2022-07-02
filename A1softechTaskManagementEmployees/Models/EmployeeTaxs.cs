namespace A1softechTaskManagementEmployees.Models
{
    public class EmployeeTaxs
    {
        public Guid ID { get; set; } = new Guid();
        public float Tax { get; set; }
        public float NetSalary { get; set; }
        public Guid EmployeeID { get; set; }
    }
}
