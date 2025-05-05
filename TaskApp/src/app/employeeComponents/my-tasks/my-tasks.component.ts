import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTaskService } from '../services/my-task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskPopupComponent } from './task-popup/task-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
  constructor(
    private mytaskService: MyTaskService,
    private dialog: MatDialog
  ) {}

  dataSource!: MatTableDataSource<any>;
  myTask: any[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'createat',
    'duedate',
    'status',
    'action',
    'approved',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getMyTask();
  }

  applyFilter(event: any) {
    const filteredValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filteredValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMyTask() {
    const employeeId = localStorage.getItem('userId');

    this.mytaskService.getMyTask(employeeId).subscribe({
      next: (res) => {
        this.myTask = res.details;
        this.dataSource = new MatTableDataSource(this.myTask);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  completeTask(taskID: any) {
    const taskId = taskID;

    const dialogRef = this.dialog.open(TaskPopupComponent, {
      width: '30%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        taskId: taskId,
        formTitle: 'Submit task',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMyTask();
      }
    });
  }

  isPastDue(dueDate: Date): boolean {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
  }

  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'pending';
    } else if (status === 'completed') {
      return 'completed';
    } else if (status === 'needtime') {
      return 'request';
    }
    return ''; // Default case if status is not recognized
  }
}
