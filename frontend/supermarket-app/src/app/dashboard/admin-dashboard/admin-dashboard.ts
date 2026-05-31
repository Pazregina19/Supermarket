import {ChangeDetectorRef, Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupermarketService} from '../../services/supermarket';

@Component({
  selector: 'app-admin-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './admin-dashboard.html',

  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard
implements OnInit {

  pendingSupermarkets: any[] = [];

  loading: boolean = true;

  constructor(
    private supermarketService:
    SupermarketService,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadPendingSupermarkets();

  }

  loadPendingSupermarkets(): void {

    this.supermarketService
      .getAll()
      .subscribe({

        next: (response: any) => {
          console.log(response);

          this.pendingSupermarkets =
            response.filter(
              (supermarket: any) =>
                !supermarket.approved
            );

          this.loading = false;
          this.cdr.markForCheck();

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;
          this.cdr.markForCheck();

        }

      });

  }

  approveSupermarket(id: string): void {

    this.supermarketService
      .approve(id)
      .subscribe({

        next: () => {

          this.pendingSupermarkets =
            this.pendingSupermarkets.filter(
              (s: any) =>
                s._id !== id
            );

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

}