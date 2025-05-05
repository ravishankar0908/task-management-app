import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerApi = 'http://localhost:3000/registration';

  registerUser(registerData: any): Observable<any> {
    return this.http.post(this.registerApi, registerData);
  }
}
