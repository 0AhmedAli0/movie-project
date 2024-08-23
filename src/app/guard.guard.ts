import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const r = inject(AuthService);
  if (r.udd.getValue() == null) {
    // if (r.udd.getValue() != null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
