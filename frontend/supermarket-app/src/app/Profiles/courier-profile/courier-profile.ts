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
  selector: 'app-courier-profile',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './courier-profile.html',

  styleUrls:
    ['./courier-profile.css']
})
export class CourierProfile
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