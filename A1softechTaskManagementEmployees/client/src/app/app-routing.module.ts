import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeComponent } from './component/employee/employee.component';

const routes: Routes = [
  { path: 'Employees/:id',component: EmployeeDetailsComponent },
  { path: 'Employee/:id',component: EmployeeComponent },
  { path: 'Employees', component: EmployeeListComponent },
  { path: '', redirectTo: 'Employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
