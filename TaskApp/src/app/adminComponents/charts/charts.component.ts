import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartsService } from '../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(private chartService: ChartsService) {}

  maleCount: number = 0;
  femaleCount: number = 0;

  ngOnInit(): void {
    this.createPieChart();
    this.countUserRole();
  }

  //number male and female users
  createPieChart(): void {
    const genderCount = document.getElementById('myPieChart') as HTMLCanvasElement;
    this.chartService.getGenderCount().subscribe({
      next: (res) => {
        this.maleCount = res.data[0].count;
        this.femaleCount = res.data[1].count;

        new Chart(genderCount, {
          type: 'pie',
          data: {
            labels: ['Male', 'Female'],
            datasets: [
              {
                label: 'Gender Count',
                data: [this.maleCount, this.femaleCount],
                backgroundColor: ['#36a2eb', '#ff6384'],
                hoverBackgroundColor: ['#49a3f1', '#ff80a5'],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      },
      error: (error) => {
        console.log(error);
        
      },
    });
  }

  countUserRole(): void {
    const roleCount = document.getElementById('userRole') as HTMLCanvasElement;
    this.chartService.getUserRoleCount().subscribe({
      next: (res) => {
        const adminCount = res.data[0].count;
        const managerCount = res.data[1].count;
        const employeeCount = res.data[2].count;

        console.log(adminCount, managerCount, employeeCount);

        new Chart(roleCount, {
          type: 'pie',
          data: {
            labels: ['Admin', 'Manager', 'Employee'],
            datasets: [
              {
                label: 'User roles Count',
                data: [adminCount, managerCount, employeeCount],
                backgroundColor: ['grey', 'orange', 'dodgerblue'],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      },
      error: (error) => {},
    });
  }
}
