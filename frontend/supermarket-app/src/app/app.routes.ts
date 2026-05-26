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
import { RegisterAdmin } from './Auths/register-admin/register-admin';
import { Home } from './home/home';
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

export const routes: Routes = [

  { path:'products',
    component: ProductList
  },

  { path: 'products/:id',
    component: ProductDetail
  },

  { path: 'cart',
    component: Cart
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
    path: 'register/admin',
    component: RegisterAdmin
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
  component: ClientDashboard
},

{
  path: 'supermarket-dashboard',
  component: SupermarketDashboard
},

{
  path: 'courier-dashboard',
  component: CourierDashboard
},

{
  path: 'admin-dashboard',
  component: AdminDashboard
},

{
  path: 'client-profile',
  component: ClientProfile
},

{
  path: 'supermarket-profile',
  component: SupermarketProfile
},

{
  path: 'courier-profile',
  component: CourierProfile
},

{
  path: 'admin-profile',
  component: AdminProfile
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' //redirect root to home by default
  },

  {
    path: '**',
    redirectTo: '/home' //redirect undeclared routes to home by default
  }

];