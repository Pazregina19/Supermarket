import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService, public cartService: CartService) {}

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: any) {
    this.cartService.add(product);
    alert('Produto adicionado ao carrinho!');
  }
}