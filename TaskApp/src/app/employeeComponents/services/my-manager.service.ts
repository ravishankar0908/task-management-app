import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyManagerService {
  constructor(private http: HttpClient) {}

  myManagerApi = 'http://localhost:3000/employee/my-manager';

  getMyManager(employeeId: any): Observable<any> {
    const url = `${this.myManagerApi}?employeeId=${employeeId}`;
    return this.http.get<any>(url);
  }
}
