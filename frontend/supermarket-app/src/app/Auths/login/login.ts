import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {

    this.authService.login(
      this.email,
      this.password
    ).subscribe({

      next: (response: any) => {

        if (response && response.token) {

          // redirecionamento baseado na role

          if (response.role === 'admin') {

            this.router.navigate(['/admin-dashboard']);

          } else if (response.role === 'supermarket') {

            this.router.navigate(['/supermarket-dashboard']);

          } else if (response.role === 'courier') {

            this.router.navigate(['/courier-dashboard']);

          } else {

            this.router.navigate(['/']);

          }

        } else {

          this.snackBar.open(
            'Login failed. Please try again.',
            'Close',
            {
              duration: 3000
            }
          );

        }

      },

      error: (error: any) => {

        console.error(error);

        this.snackBar.open(
          'Invalid credentials.',
          'Close',
          {
            duration: 3000
          }
        );

      }

    });

  }

}