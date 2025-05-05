import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const employeeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('userRole');

  if (userRole === 'employee') {
    return true;
  }
  router.navigate(['/unauth']);
  return false;
};
