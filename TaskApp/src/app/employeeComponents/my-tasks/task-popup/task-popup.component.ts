import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MyTaskService } from '../../services/my-task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.scss'],
})
export class TaskPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TaskPopupComponent>,
    private formBuilder: FormBuilder,
    private mytaskService: MyTaskService,
    private toaster: ToastrService
  ) {}

  submitTaskForm!: FormGroup;

  ngOnInit(): void {
    this.submitTaskForm = this.formBuilder.group({
      taskId: [this.data.taskId, Validators.required],
      status: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitTask() {
    this.mytaskService.updateTaskStatus(this.submitTaskForm.value).subscribe({
      next: (res) => {
        this.toaster.success(res.message, 'success');
      },
      error: (error) => {
        this.toaster.error(error.error.message, 'error');
      },
    });
    this.submitTaskForm.reset();
    this.ref.close(true);
  }
}
