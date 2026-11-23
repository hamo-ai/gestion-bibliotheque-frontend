import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Guard : seul l'ADMIN peut entrer, sinon redirection vers la page "forbidden"
export const livreGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }
  router.navigate(['app-forbidden']);
  return false;
};
