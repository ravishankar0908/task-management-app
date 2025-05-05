import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  Api = 'http://localhost:3000/admin';

  getAllDeletedUsers(): Observable<any> {
    return this.http.get(`${this.Api}/deleted-user`);
  }

  resetUser(userId: any): Observable<any> {
    const reset = { reset: false };
    return this.http.patch(`${this.Api}/reset-user?userId=${userId}`, reset);
  }
}
