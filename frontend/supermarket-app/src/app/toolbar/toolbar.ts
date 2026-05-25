import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
