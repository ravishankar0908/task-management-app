import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService
  ) {}
  userName: any = '';
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }
  // logout button is clicked redirect to login page
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
    this.toaster.success('You are logged out successfully.', 'Logout');
  }

  open() {
    alert('opened');
  }
}
