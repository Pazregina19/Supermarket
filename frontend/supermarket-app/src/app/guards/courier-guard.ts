import { CanActivateFn } from '@angular/router';

export const courierGuard: CanActivateFn = (route, state) => {
  return true;
};
