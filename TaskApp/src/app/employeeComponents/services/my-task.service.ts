import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTaskService {
  constructor(private http: HttpClient) {}

  myTaskApi = 'http://localhost:3000/employee/my-task';
  updateTaskApi = 'http://localhost:3000/task/update-status';

  getMyTask(employeeId: any): Observable<any> {
    const url = `${this.myTaskApi}?employeeId=${employeeId}`;
    return this.http.get<any>(url);
  }

  updateTaskStatus(taskData: any): Observable<any> {
    return this.http.patch<any>(this.updateTaskApi, taskData);
  }
}
