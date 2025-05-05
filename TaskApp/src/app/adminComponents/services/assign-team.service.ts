import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignTeamService {
  constructor(private http: HttpClient) {}

  teamApi = 'http://localhost:3000/manager/push-employee';

  assignTeamMember(value: any): Observable<any> {
    const employeeeId = value.employee;
    const managerId = value.manager;
    return this.http.put(
      `${this.teamApi}?employeeId=${employeeeId}&managerId=${managerId}`,
      null
    );
  }
}
