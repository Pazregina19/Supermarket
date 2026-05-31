import {ChangeDetectorRef, Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-supermarket-profile',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './supermarket-profile.html',

  styleUrls:
    ['./supermarket-profile.css']
})
export class SupermarketProfile
implements OnInit {

  user: any;

  loading: boolean = true;

  constructor(
    private authService:AuthService,
    private cdr: ChangeDetectorRef
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