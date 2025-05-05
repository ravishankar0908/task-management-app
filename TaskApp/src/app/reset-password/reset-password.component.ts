import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  hide: boolean = true;
  hideconfirm: boolean = true;
  changePassword!: FormGroup;
  token!: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.changePassword = this.formBuilder.group(
      {
        newpass: ['', Validators.required],
        connewpass: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('newpass')?.value === control.get('connewpass')?.value
      ? null
      : { misMatch: true };
  }

  submitChangePassword() {
    this.token = this.activateRoute.snapshot.paramMap.get('token');

    this.authService
      .resetPassword(this.changePassword.value, this.token)
      .subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'success');
          console.log(res);
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'failed');
          console.log(error);
        },
      });

    this.router.navigate(['auth/login']);
  }
}
