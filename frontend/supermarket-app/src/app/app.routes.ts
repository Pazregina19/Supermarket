import { Routes } from '@angular/router';

import { Login } from './Auths/login/login';

import { RegisterClient } from './Auths/register-client/register-client';

import { RegisterSupermarket } from './Auths/register-supermarket/register-supermarket';


import { ProductList } from './products/product-list/product-list';
import { ProductDetail } from './products/product-detail/product-detail';
import { Cart } from './cart/cart';
import { RegisterCourier } from './Auths/register-courrier/register-courrier';
import { adminGuard } from './guards/admin-guard';
import { supermarketGuard } from './guards/supermarket-guard';
import { courierGuard } from './guards/courier-guard';
import { RegisterSelect } from './Auths/register-select/register-select';
import { AccessDenied } from './Auths/access-denied/access-denied';
import { SupermarketDetails } from './Supermarket/supermarket-details/supermarket-details';
import { Supermarkets } from './Supermarket/supermarkets/supermarkets';
import { ClientDashboard } from './dashboard/client-dashboard/client-dashboard';
import {AdminDashboard} from './dashboard/admin-dashboard/admin-dashboard';
import {SupermarketDashboard} from './dashboard/supermarket-dashboard/supermarket-dashboard';
import {CourierDashboard} from './dashboard/courier-dashboard/courier-dashboard';
import { ClientProfile } from './Profiles/client-profile/client-profile';
import { SupermarketProfile } from './Profiles/supermarket-profile/supermarket-profile';
import { CourierProfile } from './Profiles/courier-profile/courier-profile';
import { AdminProfile } from './Profiles/admin-profile/admin-profile';
import { SupermarketApprovals } from './Admin/supermarket-approvals/supermarket-approvals';
import { Home } from './home/home';
import { clientGuard } from './guards/client-guard';
import { Orders } from './orders/orders/orders';

export const routes: Routes = [

  { path:'products',
    component: ProductList
  },

  { path: 'products/:id',
    component: ProductDetail
  },

  { path: 'cart',
    component: Cart,
    canActivate: [
      clientGuard
    ]
  },

  {
  path: 'home',
  component: Home
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
    path: 'register/select',
    component: RegisterSelect
  },

  {
    path: 'supermarkets',
    component: Supermarkets
  },

  {
    path: 'supermarkets/:id',
    component: SupermarketDetails
  },

  {
    path: 'client-dashboard',
    component: ClientDashboard,

    canActivate: [
      clientGuard
    ]
  },

  {
    path: 'supermarket-dashboard',
    component: SupermarketDashboard,

    canActivate: [
      supermarketGuard
    ]
  },

  {
    path: 'courier-dashboard',
    component: CourierDashboard,

    canActivate: [
      courierGuard
    ]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [
      adminGuard
    ]
  },

  {
    path: 'client-profile',
    component: ClientProfile,

    canActivate: [
      clientGuard
    ]
  },

  {
    path: 'supermarket-profile',
    component: SupermarketProfile,
    canActivate: [
      supermarketGuard
    ]
  },

  {
    path: 'courier-profile',
    component: CourierProfile,
    canActivate: [
      courierGuard
    ]
  },

  {
    path: 'admin-profile',
    component: AdminProfile,
    canActivate: [
      adminGuard
    ]
  },

  {
    path: 'admin/approvals',
    component: SupermarketApprovals,
    canActivate: [adminGuard]
  },

  {
      path: 'access-denied',
      component: AccessDenied
    },

  {
    path: 'orders/client',

    component: Orders,

    canActivate: [
      clientGuard
    ]
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' //redirect root to home by default
  },

  {
    path: '**',
    redirectTo: '/home' //redirect undeclared routes to home by default
  }

];