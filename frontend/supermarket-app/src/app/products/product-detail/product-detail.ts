import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {

  product: any = null;
  comparacao: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getById(id).subscribe(data => {
      this.product = data;
      this.productService.compare(data.name).subscribe(r => {
        this.comparacao = r;
      });
    });
  }

  addToCart() {
    this.cartService.add(this.product);
    alert('Adicionado ao carrinho!');
  }
}
