import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('userRole');

  if (userRole === 'admin') {
    return true;
  }
  router.navigate(['/unauth']);
  return false;
};
