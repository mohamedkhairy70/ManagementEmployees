import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/shared/employeeservice.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee:Employee;
  constructor(private route: ActivatedRoute
    ,private router: Router
    ,private employeeserivce:EmployeeService
    ,private toastr:ToastrService) { }

  ngOnInit(): void {
    const id =  String(this.route.snapshot.paramMap.get('id'));
    this.employeeserivce.getEmployeeById(id).subscribe(res=>{
      if(res.errorCount == 0)
      {
        this.employee = JSON.parse(res.result);
      } else{
        this.toastr.warning(res.message,"Get List Employee");
      }
     })
  }
  onBack(): void{
    this.router.navigate(['/']);
  }
}
