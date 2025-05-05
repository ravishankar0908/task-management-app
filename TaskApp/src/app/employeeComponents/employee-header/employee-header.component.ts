import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.scss'],
})
export class EmployeeHeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  userName: any = '';
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }
  // logout button is clicked redirect to login page and clear localstorage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
    this.toaster.success('You are logged out successfully.', 'Logout');
  }
}
