import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AuthService
} from '../../services/auth';

@Component({
  selector: 'app-admin-profile',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './admin-profile.html',

  styleUrls:
    ['./admin-profile.css']
})
export class AdminProfile
implements OnInit {

  user: any;

  loading: boolean = true;

  constructor(
    private authService:
    AuthService
  ) {}

  ngOnInit(): void {

    this.authService
      .getProfile()
      .subscribe({

        next: (response: any) => {

          this.user =
            response.user;

          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

}