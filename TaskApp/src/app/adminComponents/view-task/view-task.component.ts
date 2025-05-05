import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  taskDetails: any[] = [];
  message: string = '';
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'created',
    'duedate',
    'employee',
    'manager',
    'status',
    'action',
    'approved',
  ];

  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe({
      next: (res) => {
        this.taskDetails = res.taskDetails;
        this.dataSource = new MatTableDataSource(this.taskDetails);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {},
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  isPastDue(dueDate: Date): boolean {
    const currentDate = new Date();
    return new Date(dueDate) < currentDate;
  }

  isDelete(status: Boolean): boolean {
    if (status) {
      return true;
    } else {
      return false;
    }
  }

  getStatusClass(status: string): string {
    if (status === 'pending') {
      return 'pending';
    } else if (status === 'completed') {
      return 'completed';
    }
    return '';
  }

  restoreTask(id: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure, you want to revert this task?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.restoreTask(id).subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'success');
            this.getAllTask();
          },
          error: (err) => {
            this.toaster.error(err.error.message, 'failed');
          },
        });
      }
    });
  }
}
