namespace A1softechTaskManagementEmployees.ViewModels
{
    public class VMEmployeeTaxs
    {
        public Guid ID { get; set; } = new Guid();
        public float Tax { get; set; }
        public float NetSalary { get; set; }
        public Guid EmployeeID { get; set; }
    }
}
