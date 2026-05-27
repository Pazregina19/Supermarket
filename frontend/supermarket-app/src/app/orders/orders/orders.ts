import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersService} from '../../services/orders';

@Component({
  selector: 'app-orders',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './orders.html',

  styleUrls: ['./orders.css']
})
export class Orders
implements OnInit {

  orders: any[] = [];

  loading: boolean = true;

  constructor(
    private ordersService:
    OrdersService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders(): void {

    this.ordersService
      .getOrders()
      .subscribe({

        next: (response: any) => {

          this.orders = response;

          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

}