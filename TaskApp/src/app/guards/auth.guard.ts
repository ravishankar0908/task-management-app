import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');
  const router = inject(Router);

  if (userId) {
    return true;
  }
  router.navigate(['/unauth']);
  return false;
};
