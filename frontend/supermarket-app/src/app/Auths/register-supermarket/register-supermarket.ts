import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth';
import { User } from '../../models/user';
import { SupermarketService } from '../../services/supermarket';

@Component({
  selector: 'app-register-supermarket',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './register-supermarket.html',
  styleUrls: ['./register-supermarket.css']
})
export class RegisterSupermarket {

  name: string = '';
  description: string = '';

  street: string = '';
  city: string = '';
  postalCode: string = '';

  schedule: string = '';

  deliveryMethod: string = 'pickup';

  deliveryCost: number = 0;

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private supermarketService: SupermarketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {

    const userData: User = {

      username: this.name,
      email: this.email,
      password: this.password,
      role: 'supermarket'

    };

    this.authService
      .registerSupermarket(userData)
      .subscribe({

        next: () => {

          this.authService.login(
            this.email,
            this.password
          ).subscribe({

            next: () => {

              const supermarketData = {

                name: this.name,

                description: this.description,

                location: {

                  street: this.street,

                  city: this.city,

                  postalCode: this.postalCode

                },

                schedule: this.schedule,

                deliveryMethod: {

                  method: this.deliveryMethod

                },

                deliveryCost: this.deliveryCost

              };

              this.supermarketService
                .create(supermarketData)
                .subscribe({

                  next: () => {

                    this.snackBar.open(
                      'Supermarket registered successfully',
                      'Close',
                      {
                        duration: 3000
                      }
                    );

                    this.router.navigate(['/login']);

                  },

                  error: (error: any) => {

                    console.error(error);

                  }

                });

            }

          });

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