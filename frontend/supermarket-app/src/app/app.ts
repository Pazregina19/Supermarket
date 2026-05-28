import {
  Component
} from '@angular/core';

import {
  RouterOutlet,
  RouterLink,
  Router
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],

  templateUrl: './app.html',

  styleUrls: ['./app.css']
})
export class App {

  get isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  constructor(
    private router: Router
  ) {}

  logout(): void {

    localStorage.clear();

    this.router.navigate([
      '/home'
    ]);

  }

}