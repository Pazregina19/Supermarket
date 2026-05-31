import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {

  products: any[] = [];
  loading: boolean = true;

  constructor(
    private productService: ProductService, 
    public cartService: CartService,
    public cdr: ChangeDetectorRef
  
  ) {}

   ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productService
      .getAll()
      .subscribe({

        next: (response: any) => {

          
          this.products =
            [...response];

          this.loading =
            false;

          this.cdr.markForCheck();

        },

        error: (error: any) => {

          console.error(error);

          this.loading =
            false;

            this.cdr.markForCheck();

        }

      });

  }

  addToCart(
  product: any
): void {

  const success =

    this.cartService
      .addToCart(product);

  if (success) {

    alert(
      'Product added to cart'
    );

  }

  else {

    alert(

      'You can only purchase products from one supermarket at a time.'

    );

  }

}

}