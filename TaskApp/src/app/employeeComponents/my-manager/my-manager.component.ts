import { Component, OnInit } from '@angular/core';
import { MyManagerService } from '../services/my-manager.service';

@Component({
  selector: 'app-my-manager',
  templateUrl: './my-manager.component.html',
  styleUrls: ['./my-manager.component.scss'],
})
export class MyManagerComponent implements OnInit {
  constructor(private mymanagerService: MyManagerService) {}
  myManagerDetail: any[] = [];

  displayedColumns: string[] = [
    'position',
    'fname',
    'lname',
    'gender',
    'email',
    'role',
    'joined',
  ];
  ngOnInit(): void {
    this.getMyManager();
  }

  getMyManager() {
    const employeeId = localStorage.getItem('userId');

    this.mymanagerService.getMyManager(employeeId).subscribe({
      next: (res) => {
        this.myManagerDetail = res.managerdetail;
      },
      error: (error) => {
        console.error(error.error);
      },
    });
  }
}
