import { Routes } from '@angular/router';

import { Login } from './Auths/login/login';

import { RegisterClient } from './Auths/register-client/register-client';

import { RegisterSupermarket } from './Auths/register-supermarket/register-supermarket';

import { RegisterCourrier } from './Auths/register-courrier/register-courrier';

export const routes: Routes = [

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
    path: 'register/courrier',
    component: RegisterCourrier
  }

];