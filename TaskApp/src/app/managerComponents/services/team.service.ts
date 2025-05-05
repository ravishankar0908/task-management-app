import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeamApi = 'http://localhost:3000/manager/my-team';

  getTeamDetail(managerId: any): Observable<any> {
    const url = `${this.getTeamApi}?managerId=${managerId}`;
    return this.http.get<any>(url);
  }
}
