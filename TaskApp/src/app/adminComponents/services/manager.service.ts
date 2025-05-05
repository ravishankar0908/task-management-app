import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}

  allManagerApi = 'http://localhost:3000/manager';

  getAllManager(): Observable<any> {
    return this.http.get(this.allManagerApi);
  }

  dePromoteManager(userId: any): Observable<any> {
    const promote = { role: 'employee' };
    return this.http.patch(
      `${this.allManagerApi}/de-promote?userId=${userId}`,
      promote
    );
  }
}
