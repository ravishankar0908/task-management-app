import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  userRole = localStorage.getItem('userRole');
  userId = localStorage.getItem('userId');
  hide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  oldPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  confirmNewPasswordHide: boolean = true;
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      userId: [this.userId],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }

  changePassword() {
    console.log(this.changePasswordForm.value);

    if (this.changePasswordForm.invalid) {
      this.toaster.error('All the fields must be filled', 'error');
    } else {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'updated');
        },
        error: (error) => {
          this.toaster.error(error.error.message, 'error');
        },
      });
    }
    this.changePasswordForm.patchValue({
      userId: this.userId,
    });
    this.changePasswordForm.reset();
  }
}
