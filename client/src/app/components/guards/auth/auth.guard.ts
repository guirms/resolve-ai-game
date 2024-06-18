import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/guards/auth/auth.service';
import { inject } from '@angular/core';
import { BaseService } from '../../../services/base/base.service';
import { ERoutePath } from '../../data-types/enums';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const baseService = inject(BaseService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } 
  else {
    baseService.navigateByUrl(ERoutePath.login);
    return false;
  }
};
