import { Guid } from "guid-typescript";

export class EmployeeTaxs{
  ID: Guid ;
  Tax: number;
  EmployeeID: Guid;
  NetSalary: number;
}
export class VMEmployeeTaxs{
  id: string ;
  tax: number;
  employeeID: string;
  netSalary: number;
}

export class Employee {
  ID: Guid;
  Name: string;
  Mobile: string;
  Email: string;
  Salary: Number;
  // NetSalary: number;
  EmployeeTaxs: Array<EmployeeTaxs> = new Array<EmployeeTaxs>();
}
export class ModelResult{
  result:string;
  errorCount :number;
  message :string;
}
export function getGUID():Guid
{
  return Guid.create()
}