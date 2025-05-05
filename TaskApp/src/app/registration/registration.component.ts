import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { toastMessage } from '../toastMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  // hiding / showing the password
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  registerFormValues!: FormGroup;

  ngOnInit(): void {
    this.registerFormValues = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      // role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  Register() {
    this.registerService.registerUser(this.registerFormValues.value).subscribe({
      next: (res) => {
        this.toaster.success(
          toastMessage.registerSuccess,
          toastMessage.successTitle
        );
      },
      error: (err) => {
        this.toaster.success(
          toastMessage.registerError,
          toastMessage.errorTitle
        );
        console.error(err.message);
      },
    });

    this.router.navigate(['/auth/login']);
    this.registerFormValues.reset();
  }
}
