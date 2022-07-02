import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee, EmployeeTaxs, getGUID, VMEmployeeTaxs } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/shared/employeeservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  form: FormGroup;
  subscription: Subscription;
  newEmployee: Employee =new Employee();
  employeeId= "";
  constructor(private formBuilder: FormBuilder
    , private service: EmployeeService
    , private toastr: ToastrService
    ,private route: ActivatedRoute
    ,private router: Router) {
    this.form = this.formBuilder.group({
      id: "0",
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      mobile: ['', [Validators.required
        , Validators.maxLength(11), Validators.minLength(11)]],
      salary: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.employeeId =  String(this.route.snapshot.paramMap.get('id'));
    if(this.employeeId != "0")
    {
      this.service.getEmployeeById(this.employeeId).subscribe(t=>{
        if(t.errorCount == 0)
        {
          this.newEmployee = JSON.parse(t.result);
          this.form = this.formBuilder.group({
            id: String(this.newEmployee?.ID),
            name: this.newEmployee?.Name,
            email: this.newEmployee?.Email,
            mobile: this.newEmployee?.Mobile,
            salary: this.newEmployee?.Salary,
          });
        } 
       })
      
    }
  }
  addEmployee() {

    if (this.employeeId == "0") {
      this.addNew();
    } else {
      this.edit();
    }

  }

  addNew() {
    let empID =  getGUID();
    let empTaxList:VMEmployeeTaxs[] =[];
    this.newEmployee.EmployeeTaxs.forEach(element => {
      empTaxList.push({id:String(element.ID),tax:element.Tax,employeeID: String(empID),netSalary:element.NetSalary});
    });
    
    let nEmployee = {
      id: String(empID),
      name: this.form.get('name')?.value,
      mobile: this.form.get('mobile')?.value,
      email: this.form.get('email')?.value,
      salary:this.form.get('salary')?.value,
      employeeTaxs: empTaxList,
    }

    this.service.addEmployee(nEmployee).subscribe(res => {
      this.toastr.success(res.message,"Add Employee")
      if(res.errorCount <= 0)
      {
        this.form.reset();}
    });
  }

  edit() {
    let empID = String(this.form.get('id')?.value);
    let empTaxList:VMEmployeeTaxs[] =[];
    this.newEmployee.EmployeeTaxs.forEach(element => {
      empTaxList.push({id:String(element.ID),tax:element.Tax,employeeID: String(empID),netSalary:element.NetSalary});
    });

    const nEmployee = {
      id: empID,
      name: this.form.get('name')?.value,
      mobile: this.form.get('mobile')?.value,
      email: this.form.get('email')?.value,
      salary:this.form.get('salary')?.value,
      employeeTaxs: empTaxList,
    }

    this.service.updateEmployee(this.employeeId, nEmployee)
      .subscribe(res => {
        this.toastr.success(res.message, 'Update Employee')
        this.service.getEmployees();
        if(res.errorCount == 0)
        {
          this.form.reset();
          this.router.navigate(['/']);
        }        
      });
    console.log(this.employeeId?.toString());
  }
  onBack(): void{
    this.router.navigate(['/']);
  }
}
