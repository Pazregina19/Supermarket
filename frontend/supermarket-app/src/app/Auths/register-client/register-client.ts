import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './register-client.html',
  styleUrls: ['./register-client.css']
})
export class RegisterClient {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {

    const userData = {

      email: this.email,
      password: this.password,

      role: 'client'

    };

    this.authService.register(userData)
      .subscribe({

        next: (response: any) => {

          this.snackBar.open(
            'Client registration successful',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate(['/login']);

        },

        error: (error: any) => {

          console.error(error);

          this.snackBar.open(
            error.error?.error || 'Registration failed',
            'Close',
            {
              duration: 3000
            }
          );

        }

      });

  }

}