import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink, Router } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-toolbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './toolbar.html',

  styleUrls: ['./toolbar.css']
})
export class Toolbar {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {

    return this.authService.logedIn();

  }

  get role(): string | null {

    return this.authService.getRole();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}