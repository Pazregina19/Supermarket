import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css']
})
export class CreateProduct {

  name = '';
  description = '';
  category = '';
  price = 0;
  stock = 0;
  image = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  save(): void {

    const productData = {

      name: this.name,

      description: this.description,

      category: this.category,

      price: this.price,

      stock: this.stock,

      image: this.image

    };

    this.productService
      .addProduct(productData)
      .subscribe({

        next: () => {

          alert(
            'Product created successfully!'
          );

          this.router.navigate([
            '/supermarket-dashboard'
          ]);

        },

        error: (err) => {

          console.error(err);

          alert(
            'Error creating product'
          );

        }

      });

  }

}