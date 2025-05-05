import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginApi = 'http://localhost:3000/auth';

  loginAuth(credentials: any): Observable<any> {
    return this.http.post(this.loginApi, credentials);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  // this is api send the password reset link to the user mail.
  forgotPassword(formValue: any): Observable<any> {
    return this.http.post(`${this.loginApi}/forgot-password`, formValue);
  }

  // using the link in the mail we can reset the password.
  resetPassword(newData: any, token: any): Observable<any> {
    return this.http.patch(`${this.loginApi}/reset-password/${token}`, newData);
  }

  // this api can be used to change the user password by verifying with the old password.
  changePassword(newData: any): Observable<any> {
    return this.http.patch(`${this.loginApi}/change-password`, newData);
  }
}
