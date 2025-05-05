import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { toastMessage } from 'src/app/toastMessage';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';
import { Title } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-managers',
  templateUrl: './view-managers.component.html',
  styleUrls: ['./view-managers.component.scss'],
})
export class ViewManagersComponent implements OnInit {
  constructor(
    private managerService: ManagerService,
    private toaster: ToastrService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  managerDetails: any[] = [];
  message: string = '';
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'position',
    'fname',
    'lname',
    'email',
    'role',
    'gender',
    'joined',
    'actions',
  ];

  ngOnInit(): void {
    this.getManager();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getManager() {
    this.managerService.getAllManager().subscribe({
      next: (res) => {
        this.message = res.message;
        this.managerDetails = res.ManagerDetails;
        this.dataSource = new MatTableDataSource(this.managerDetails);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        if (error.status === 404) {
          console.log(error.message);
        }
        console.log(error.message);
      },
    });
  }

  editManager(userId: any) {}
  deleteManager(id: any) {
    const userId = id;

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '20%',
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure you want to delete this manager?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployeeById(userId).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'delete');
            this.getManager();
          },
          error: (err) => {
            this.toaster.success(err.message, 'delete');
          },
        });
      }
    });
  }
  dePromoteManager(id: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '20%',
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure you want to de-promote this manager?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const userId = id;
        this.managerService.dePromoteManager(userId).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'De-promoted');
            this.getManager();
          },
          error: (error) => {
            this.toaster.success(error.message, toastMessage.errorTitle);
          },
        });
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
