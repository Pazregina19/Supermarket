import { Routes } from '@angular/router';

import { Login } from './Auths/login/login';

import { RegisterClient } from './Auths/register-client/register-client';

import { RegisterSupermarket } from './Auths/register-supermarket/register-supermarket';

import { RegisterCourier } from './Auths/register-courrier/register-courrier';
import { AdminDashboard } from './dashboard/admin-dashboard/admin-dashboard';
import { SupermarketDashboard } from './dashboard/supermarket-dashboard/supermarket-dashboard';
import { CourierDashboard } from './dashboard/courier-dashboard/courier-dashboard';
import { adminGuard } from './guards/admin-guard';
import { supermarketGuard } from './guards/supermarket-guard';
import { courierGuard } from './guards/courier-guard';
import { RegisterAdmin } from './Auths/register-admin/register-admin';
import { Home } from './home/home';
import { AccessDenied } from './Auths/access-denied/access-denied';

export const routes: Routes = [

  {
  path: '',
  component: Home
  },

  {
    path: '',
    component: Login
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register/client',
    component: RegisterClient
  },

  {
    path: 'register/supermarket',
    component: RegisterSupermarket
  },

  {
    path: 'register/courier',
    component: RegisterCourier
  },

  {
    path: 'register/admin',
    component: RegisterAdmin
  },

  {
  path: 'admin-dashboard',
  component: AdminDashboard,
  canActivate: [adminGuard]
},

{
  path: 'supermarket-dashboard',
  component: SupermarketDashboard,
  canActivate: [supermarketGuard]
},

{
  path: 'courier-dashboard',
  component: CourierDashboard,
  canActivate: [courierGuard]
},

{path: 'access-denied', component: AccessDenied },
{path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home by default
{path: '**', redirectTo: '/home' },

];