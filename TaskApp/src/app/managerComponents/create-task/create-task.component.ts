import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  taskFormValues!: FormGroup;
  task: any;
  isUpdate: any = false;
  teamList: any[] = [];
  readonly minDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private taskService: TaskService,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskFormValues = this.formBuilder.group({
      taskId: [''],
      name: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getTeamList();

    this.task = this.activatedRoute.snapshot.data['task'];

    if (this.task && this.task.data) {
      this.isUpdate = true;
      this.taskFormValues.patchValue({
        taskId: this.task.data._id,
        name: this.task.data.name,
        employeeId: this.task.data.employeeId._id,
        dueDate: this.task.data.dueDate,
        description: this.task.data.description,
      });
    } else {
      this.isUpdate = false;
      this.taskFormValues.reset();
    }
  }

  assignTask() {
    if (!this.isUpdate) {
      const managerId = localStorage.getItem('userId');
      this.taskService
        .postTask(managerId, this.taskFormValues.value)
        .subscribe({
          next: (res) => {
            this.toaster.success(res.message, 'success');
          },
          error: (error) => {
            if (error.status === 400) {
              this.toaster.error(error.error.message, 'error');
            } else if (error.status === 409) {
              this.toaster.error(error.error.message, 'error');
            } else if (error.status === 500) {
              this.toaster.error(error.error.message, 'error');
            }
          },
        });
    } else {
      this.taskService.updateTask(this.taskFormValues.value).subscribe({
        next: (res) => {
          this.toaster.success(res.message, 'updated');
        },
        error: (err) => {
          this.toaster.error(err.error.message, 'error');
        },
      });
    }
    this.taskFormValues.reset();
  }

  getTeamList() {
    const userId = localStorage.getItem('userId');

    this.teamService.getTeamDetail(userId).subscribe({
      next: (res) => {
        this.teamList = res.details[0].employeeDetail;
      },
      error: (error) => {
        if (error.status === 400) {
          console.log(error.error.message);
        }
      },
    });
  }
}
