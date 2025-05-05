import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toastMessage } from '../toastMessage';
import * as jwt from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // hide is for showing/hiding password field in the login form.
  hide = true;

  userName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  loginFormValues!: FormGroup;

  ngOnInit(): void {
    this.loginFormValues = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.authService.loginAuth(this.loginFormValues.value).subscribe({
      next: (res) => {
        this.toaster.success(
          toastMessage.loginSuccess,
          toastMessage.successTitle
        );
        debugger;
        if (res.success) {
          // get the token and store it in the localstorage
          const token = res.token;
          localStorage.setItem('token', token);
          const userRole = res.userRole;
          localStorage.setItem('userRole', userRole);

          // getting userId and storing it in the localstorage
          const userId = res.userDetail._id;
          localStorage.setItem('userId', userId);

          const decodeToken: any = jwt.jwtDecode(token);
          this.userName = decodeToken.firstName + ' ' + decodeToken.lastName;
          localStorage.setItem('userName', this.userName);

          this.redirectBasedOnRole(userRole);
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.toaster.error(
            toastMessage.invalidPassword,
            toastMessage.errorTitle
          );
        } else if (error.status === 404) {
          this.toaster.error(
            toastMessage.invalidEmail,
            toastMessage.errorTitle
          );
        }
      },
    });

    this.loginFormValues.reset();
  }

  private redirectBasedOnRole(userRole: string) {
    if (userRole === 'admin') {
      // If the user is an admin navigate them to the admin dashboard
      this.router.navigate(['/admin']);
    } else if (userRole === 'employee') {
      // If the user is an employee navigate them to the employee dashboard
      this.router.navigate(['/employee']);
    } else if (userRole === 'manager') {
      // If the user is a manager navigate them to the manager dashboard
      this.router.navigate(['/manager']);
    }
  }
}
