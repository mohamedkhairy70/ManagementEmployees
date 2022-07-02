using A1softechTaskManagementEmployees.Models;
using A1softechTaskManagementEmployees.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace A1softechTaskManagementEmployees.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesDbContext _context;
        private readonly IRepository<Employee> repository;

        public EmployeesController(IRepository<Employee> repository, EmployeesDbContext context)
        {
            _context = context;
            this.repository = repository;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<ModelResult>> GetEmployees()
        {
            var employees = await _context.Employees.Include(x=>x.EmployeeTaxs).ToListAsync();
            if (employees is null)
            {
                return NotFound(new ModelResult { ErrorCount = 1, Message = "Not Found" });
            }
            string str = JsonConvert.SerializeObject(employees, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            return Ok(new ModelResult { Result = str });
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ModelResult>> GetEmployee(Guid id)
        {
            var employee = await _context.Employees.Include(x => x.EmployeeTaxs).Where(o => o.ID == id).FirstOrDefaultAsync();

            if (employee == null)
            {
                return NotFound(new ModelResult { ErrorCount = 1, Message = "Not Found" });
            }
            string str = JsonConvert.SerializeObject(employee, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            return Ok(new ModelResult { Result = str });
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ModelResult>> PutEmployee(Guid id, Employee employee)
        {
            if (id != employee.ID)
            {
                return BadRequest(new ModelResult { ErrorCount = 1, Message = "Bad Request" });
            }

            try
            {
                repository.Update(employee);
                await repository.SaveAll();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound(new ModelResult { ErrorCount = 1, Message = "Not Found" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new ModelResult { Message = "Successful Update" });
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            await repository.Add(employee);
            await repository.SaveAll();
            return Ok(new ModelResult { Message = "Successful Add",Result= JsonConvert.SerializeObject(employee) });
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new ModelResult { ErrorCount = 1, Message = "Not Found" });
            }
            repository.Delete(employee);
            await repository.SaveAll();

            return Ok(new ModelResult { Message = "Successful Delete", Result = JsonConvert.SerializeObject(employee) });

        }

        private bool EmployeeExists(Guid id)
        {
            return _context.Employees.Any(e => e.ID == id);
        }
    }
}
