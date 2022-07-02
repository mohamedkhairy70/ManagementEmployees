import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/shared/employeeservice.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public employeeservice:EmployeeService,private router: Router,private toastr:ToastrService) { }


  ngOnInit(): void {
    this.employeeservice.getEmployees();
  }
  delete(id?:Guid)
  {
    if(id && confirm("Are You Sure??")){
      this.employeeservice.deleteEmployee(String(id))
        .subscribe(res => {
          this.toastr.warning(res.message,"Delete Employee");
          this.employeeservice.getEmployees();
        })
      }
  }

}
