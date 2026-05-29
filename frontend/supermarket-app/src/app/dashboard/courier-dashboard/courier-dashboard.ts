import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryService} from '../../services/delivery';

@Component({
  selector: 'app-courier-dashboard',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
  './courier-dashboard.html',

  styleUrls: [
    './courier-dashboard.css'
  ]
})
export class CourierDashboard
implements OnInit {

  deliveries: any[] = [];

  loading: boolean = true;

  constructor(
    private deliveryService:
    DeliveryService
  ) {}

  ngOnInit(): void {

    this.loadDeliveries();

  }

  loadDeliveries(): void {

    this.deliveryService
      .getPending()
      .subscribe({

        next: (response: any) => {

          this.deliveries =
            response;

          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  acceptDelivery(
    id: string
  ): void {

    this.deliveryService
      .accept(id)
      .subscribe({

        next: () => {

          this.loadDeliveries();

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

  markDelivered(
    id: string
  ): void {

    this.deliveryService
      .markDelivered(id)
      .subscribe({

        next: () => {

          this.loadDeliveries();

        },

        error: (error) => {

          console.error(error);

        }

      });
}

}