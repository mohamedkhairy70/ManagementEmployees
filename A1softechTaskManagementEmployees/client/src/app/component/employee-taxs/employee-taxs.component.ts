import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { EmployeeTaxs, getGUID } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/shared/employeeservice.service';

@Component({
  selector: 'app-employee-taxs',
  templateUrl: './employee-taxs.component.html',
  styleUrls: ['./employee-taxs.component.css']
})
export class EmployeeTaxsComponent implements OnInit {
  @Input() employeeTax: Array<EmployeeTaxs> = new Array<EmployeeTaxs>();
  @Input() Salary: number=0;
  formItem: FormGroup;
  IdEdit:string="";
  constructor(private formbuilder: FormBuilder
    , private toastr: ToastrService
    , private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.formItem = this.formbuilder.group({
      id: "",
      tax: [0,Validators.required],
    });
  }
  newItem(id:Guid) {

    let NewItem = new EmployeeTaxs();
    NewItem.ID = id;
    NewItem.Tax = 0;
    NewItem.NetSalary = 0;

    this.employeeTax.push(NewItem);
    
  }
  addItem(){

    let id  = this.IdEdit;
    if (!id)
    {
      id = String(getGUID());
      if (id) {
        this.newItem(Guid.parse(id));
      }
    }
    this.employeeTax.filter(i => String(i.ID) == id).forEach(element => {
      element.ID = Guid.parse(id),
      element.Tax = Number(this.formItem.get("tax")?.value)
      element.NetSalary = this.Salary - (this.Salary * element.Tax / 100);
    });
    this.IdEdit = "";
    this.formItem.reset()
  }
  removeItem(item:EmployeeTaxs)
  {
    this.employeeService.removeItem(this.employeeTax,item);
    this.IdEdit = "";
  }
  editItem(item:EmployeeTaxs)
  {
    this.IdEdit = String(item.ID);
    this.formItem = this.formbuilder.group({
      id: String(item.ID),
      tax: [item.Tax,Validators.required],
    });
  }
}
