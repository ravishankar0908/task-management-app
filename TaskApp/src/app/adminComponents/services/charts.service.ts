import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  getGenderApi = 'http://localhost:3000/admin/gender-count';
  userRoleApi = 'http://localhost:3000/admin/user-role-count';

  getGenderCount(): Observable<any> {
    return this.http.get(this.getGenderApi);
  }

  getUserRoleCount(): Observable<any> {
    return this.http.get(this.userRoleApi);
  }
}
