import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  return localStorage.getItem('role') === 'admin';

};