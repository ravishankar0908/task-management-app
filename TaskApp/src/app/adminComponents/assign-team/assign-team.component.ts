import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ManagerService } from '../services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { AssignTeamService } from '../services/assign-team.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-assign-team',
  templateUrl: './assign-team.component.html',
  styleUrls: ['./assign-team.component.scss'],
})
export class AssignTeamComponent implements OnInit {
  assignTeam!: FormGroup;
  employeeList: any[] = [];
  managerList: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private managerService: ManagerService,
    private toaster: ToastrService,
    private assignTeamService: AssignTeamService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFormValues();
    this.getEmployee();
    this.getManager();
  }

  getFormValues() {
    this.assignTeam = this.formBuilder.group({
      manager: ['', Validators.required],
      employee: ['', Validators.required],
    });
  }

  assignTeamMember() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      data: {
        Title: 'Are you sure you want to assign the employee? to this manager',
      },
      position: {
        top: '10px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignTeamService
          .assignTeamMember(this.assignTeam.value)
          .subscribe({
            next: (res) => {
              this.toaster.success(res.message, 'success');
            },
            error: (error) => {
              if (error.status === 409) {
                this.toaster.error(error.error.message, 'failed');
              }
              this.toaster.error('team not created', 'error');
            },
          });
        this.assignTeam.reset();
      }
    });
  }

  getEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (res) => {
        this.employeeList = res.employeeDetails;
      },
      error: (error) => {},
    });
  }

  getManager() {
    this.managerService.getAllManager().subscribe({
      next: (res) => {
        this.managerList = res.ManagerDetails;
      },
      error: (error) => {},
    });
  }
}
