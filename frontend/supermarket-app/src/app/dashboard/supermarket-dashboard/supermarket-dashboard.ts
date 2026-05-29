import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { SaleService } from '../../services/sale';

@Component({
  selector: 'app-supermarket-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './supermarket-dashboard.html',
  styleUrl: './supermarket-dashboard.css'
})
export class SupermarketDashboard implements OnInit {

  products: any[] = [];
  sales: any[] = [];

  productCount = 0;
  salesTotal = 0;

  // Necessários para o HTML
  orderCount = 0;
  pendingOrders = 0;

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    private router: Router
  ) {}

  createProduct(): void {
    this.router.navigate(['/create-product']);
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  ngOnInit(): void {

    this.loadProducts();
    this.loadSales();

  }

  loadProducts(): void {

    this.productService
      .getAll()
      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.products = response;

          this.productCount =
            response.length;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadSales(): void {

    this.saleService
      .getSales()
      .subscribe({

        next: (response: any) => {

          this.sales = response;

          this.salesTotal =

            response.reduce(

              (
                total: number,
                sale: any
              ) =>

                total +
                (sale.total || 0),

              0

            );

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}