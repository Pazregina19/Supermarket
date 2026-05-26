import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './register-admin.html',
  styleUrls: ['./register-admin.css']
})
export class RegisterAdmin {

  username: string = '';

  email: string = '';

  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {

    const userData: User = {

      username: this.username,

      email: this.email,

      password: this.password,

      role: 'admin'

    };

    this.authService
      .registerAdmin(userData)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Admin registered successfully',
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
            'Registration failed',
            'Close',
            {
              duration: 3000
            }
          );

        }

      });

  }

}