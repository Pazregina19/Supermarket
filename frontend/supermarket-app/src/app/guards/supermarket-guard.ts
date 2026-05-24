import { CanActivateFn } from '@angular/router';

export const supermarketGuard: CanActivateFn = (route, state) => {
  return true;
};
