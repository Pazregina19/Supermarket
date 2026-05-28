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

  selector:
  'app-client-profile',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
  './client-profile.html',

  styleUrls: [
    './client-profile.css'
  ]

})
export class ClientProfile
implements OnInit {

  user: any = null;

  loading: boolean = true;

  constructor(
    private authService:
    AuthService
  ) {}

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.authService
      .getProfile()
      .subscribe({

        next: (response: any) => {

          console.log(response);
          this.user =
            response.user;

          this.loading =
            false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading =
            false;

        }

      });

  }

}