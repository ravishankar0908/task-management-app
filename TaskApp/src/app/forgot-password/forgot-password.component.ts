import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  hide: boolean = true;
  changePassword!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changePassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitChangePassword() {
    this.authService.forgotPassword(this.changePassword.value).subscribe({
      next: (res) => {
        this.toaster.success(res.message, 'sent');
      },
      error: (error) => {
        this.toaster.error(error.error.message, 'failed');
      },
    });
    this.changePassword.reset();
    //this.router.navigate(['/auth/login']);
  }
}
