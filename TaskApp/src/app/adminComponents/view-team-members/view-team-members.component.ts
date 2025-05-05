import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-team-members',
  templateUrl: './view-team-members.component.html',
  styleUrls: ['./view-team-members.component.scss'],
})
export class ViewTeamMembersComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  employeeDetails: any[] = [];
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (res) => {
        this.employeeDetails = res.employeeDetails;
        this.dataSource = new MatTableDataSource(this.employeeDetails);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {},
    });
  }

  editEmployee(id: any) {
    alert(id);
  }

  deleteEmployee(id: any) {
    const userId = id;

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '20%',
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure you want to delete this employee?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployeeById(userId).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'delete');
            this.getAllEmployee();
          },
          error: (err) => {
            this.toaster.success(err.message, 'delete');
          },
        });
      }
    });
  }

  // promote employee to manager
  promoteEmployee(userId: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure, you want to promote this employee to manager?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.promoteEmployee(userId).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'promoted');
            this.getAllEmployee();
          },
          error: (error) => {
            this.toaster.error(error.error, 'Failed');
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
