import { inject } from '@angular/core';
import {CanActivateFn,Router} from '@angular/router';
import {AuthService} from '../services/auth';

export const courierGuard:
CanActivateFn = () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  if(

    authService.logedIn() &&

    authService.getRole()
    === 'courier'

  ) {

    return true;

  }

  router.navigate([
    '/access-denied'
  ]);

  return false;

};