import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css',
})
export class ClientDashboard implements OnInit {

  totalOrders: number = 0;
  pendingDeliveries: number = 0;
  totalPurchases: number = 0;
  loading: boolean = true;

  constructor(
    private ordersService: OrdersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.ordersService.getOrders().subscribe({
      next: (orders: any[]) => {
        this.totalOrders = orders.length;

        this.pendingDeliveries = orders.filter(
          (o: any) =>
            o.status === 'pending' ||
            o.status === 'confirmed' ||
            o.status === 'in process' ||
            o.status === 'in delivering'
        ).length;

        this.totalPurchases = orders.reduce(
          (sum: number, o: any) => sum + (o.total || 0),
          0
        );

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}