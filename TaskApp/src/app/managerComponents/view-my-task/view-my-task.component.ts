import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-my-task',
  templateUrl: './view-my-task.component.html',
  styleUrls: ['./view-my-task.component.scss'],
})
export class ViewMyTaskComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  messages: any = '';
  myTask: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position',
    'name',
    'created',
    'duedate',
    'description',
    'status',
    'employeeName',
    'action',
    'submit',
  ];

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    const managerId = localStorage.getItem('userId');
    this.taskService.getTask(managerId).subscribe({
      next: (res) => {
        this.myTask = res.details;
        this.dataSource = new MatTableDataSource(this.myTask);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        if (error.status === 400) console.error(error.message);
      },
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  updateTask(id: any) {
    this.router.navigate(['/manager/task', { taskId: id }]);
  }

  deleteMyTask(id: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure, you want to delete the task?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'success');
            this.getTask();
          },
          error: (error) => {
            this.toaster.error(error.error.message, 'error');
          },
        });
      }
    });
  }

  viewTaskMessagePopup(id: any) {
    const taskId = id;

    this.taskService.getTaskById(id).subscribe({
      next: (res) => {
        this.dialog.open(MessagePopupComponent, {
          width: '40%',
          enterAnimationDuration: '200ms',
          exitAnimationDuration: '200ms',
          data: {
            title: 'View Message',
            id: id,
            message: res.data.message,
            status: res.data.status,
          },
        });
      },
      error: (error) => {},
    });
  }

  approveTask(taskId: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure, you want approve the task?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.approveTaskByManager(taskId).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'success');
          },
          error: (error) => {
            this.toaster.error(error.error.message, 'error');
          },
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(event: any) {
    const filterValue = event.value.toLowerCase().trim();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (!filter) {
        return true;
      }
      return data.status.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }
}
