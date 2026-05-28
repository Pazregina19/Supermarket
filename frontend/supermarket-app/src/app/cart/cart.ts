import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart';
import { SaleService} from '../services/sale';

@Component({
  selector: 'app-cart',

  standalone: true,

  imports: [
    CommonModule,
  ],

  templateUrl: './cart.html',

  styleUrls: ['./cart.css']
})
export class Cart
implements OnInit {

  cart: any[] = [];

  total: number = 0;

  constructor(
    private cartService:
    CartService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {

    this.loadCart();

  }

  loadCart(): void {

    this.cart =
    this.cartService
      .getCart();

    this.calculateTotal();

  }

  calculateTotal(): void {

    this.total = 0;

    this.cart.forEach(product => {

      this.total +=

        product.price *
        product.quantity;

    });

  }

  remove(
    id: string
  ): void {

    this.cartService
      .removeFromCart(id);

    this.loadCart();

  }

 checkout(): void {

  const saleData = {

    products:
    this.cart,

    total:
    this.total

  };

  this.saleService
    .createSale(
      saleData
    )
    .subscribe({

      next: () => {

        alert(
          'Order placed successfully!'
        );

        this.cartService
          .clearCart();

        this.loadCart();

      },

      error: (
        error: any
      ) => {

        console.error(
          error
        );

        alert(
          'Checkout failed'
        );

      }

    });

}

}