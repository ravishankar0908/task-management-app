import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from './task.service';
import { inject } from '@angular/core';

export const TaskResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const taskId = route.paramMap.get('taskId');
  const taskService = inject(TaskService);
  if (taskId) {
    return taskService.getTaskById(taskId);
  } else {
    return of(null);
  }
};
