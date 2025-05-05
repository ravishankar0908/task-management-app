import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  allEmployeeApi = 'http://localhost:3000/employee';

  getAllEmployee(): Observable<any> {
    return this.http.get<any>(this.allEmployeeApi);
  }

  deleteEmployeeById(userId: any): Observable<any> {
    return this.http.delete(`${this.allEmployeeApi}/delete?userId=${userId}`);
  }

  promoteEmployee(userId: any): Observable<any> {
    const promote = { role: 'manager' };
    return this.http.patch(
      `${this.allEmployeeApi}/promote?userId=${userId}`,
      promote
    );
  }
}
