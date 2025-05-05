import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../services/team.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss'],
})
export class ViewTeamComponent implements OnInit {
  constructor(private teamService: TeamService) {}

  teamList: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'position',
    'fname',
    'lname',
    'email',
    'role',
    'gender',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getMyTeamMembers();
  }

  getMyTeamMembers() {
    const managerId = localStorage.getItem('userId');

    this.teamService.getTeamDetail(managerId).subscribe({
      next: (res) => {
        this.teamList = res.details[0].employeeDetail;
        this.dataSource = new MatTableDataSource(this.teamList);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  applyFilter(event: any) {
    const filteredValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filteredValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
