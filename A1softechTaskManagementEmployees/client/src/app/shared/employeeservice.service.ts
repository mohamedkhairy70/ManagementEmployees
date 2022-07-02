import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee, ModelResult } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  appUrl = "https://localhost:7138/";
  appemployee = "api/Employees"
  list: Employee[];
  constructor(private http: HttpClient,private toastr:ToastrService) { }
  
  addEmployee(employee:any): Observable<ModelResult>{
    return this.http.post<ModelResult>
      (this.appUrl + this.appemployee, employee);
  }

  getEmployees() {
    return this.http.get<ModelResult>
      (this.appUrl + this.appemployee).subscribe(res=>{
        if(res.errorCount == 0)
        {
          this.list = JSON.parse(res.result);
        } else{
          this.toastr.warning(res.message,"Get List Employee");
        }
      })
  }

  getEmployeeById(id :string): Observable<ModelResult>{
    return this.http.get<ModelResult>
      (this.appUrl + this.appemployee+"/"+id);
  }

  updateEmployee(id :string,employee: any): Observable<ModelResult>{
    return this.http.put<ModelResult>
      (this.appUrl + this.appemployee+"/"+id, employee);
  }

  deleteEmployee(id :string): Observable<ModelResult>{
    return this.http.delete<ModelResult>
      (this.appUrl + this.appemployee+"/"+id);
  }
  removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
