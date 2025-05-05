import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.scss'],
})
export class ManagerHeaderComponent implements OnInit {
  constructor(private router: Router, private toaster: ToastrService) {}
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
