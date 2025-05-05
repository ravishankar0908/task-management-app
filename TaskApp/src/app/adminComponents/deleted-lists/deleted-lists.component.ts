import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { toastMessage } from 'src/app/toastMessage';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/confirm-popup/confirm-popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-deleted-lists',
  templateUrl: './deleted-lists.component.html',
  styleUrls: ['./deleted-lists.component.scss'],
})
export class DeletedListsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  deletedUser: any[] = [];
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
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllDeletedUsers();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getAllDeletedUsers() {
    this.userService.getAllDeletedUsers().subscribe({
      next: (res) => {
        this.deletedUser = res.userDetails;
        this.dataSource = new MatTableDataSource(this.deletedUser);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {},
    });
  }

  addUser(id: any) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '20%',
      exitAnimationDuration: '200ms',
      enterAnimationDuration: '200ms',
      position: {
        top: '10px',
      },
      data: {
        Title: 'Are you sure you want revert this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.resetUser(id).subscribe({
          next: (res) => {
            this.toaster.success(res.message, toastMessage.successTitle);
            this.getAllDeletedUsers();
          },
          error: (error) => {
            this.toaster.error(
              toastMessage.notReseted,
              toastMessage.errorTitle
            );
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
