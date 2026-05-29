import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

import { ProductService } from '../../services/product';
import { SupermarketService } from '../../services/supermarket';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css']
})
export class CreateProduct implements OnInit {

  name = '';
  description = '';
  category = '';
  price = 0;
  stock = 0;
  image = '';
  supermarketId = '';  // ← novo campo

  constructor(
    private productService: ProductService,
    private supermarketService: SupermarketService,  // ← novo serviço
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vai buscar o supermarket do utilizador autenticado
    this.supermarketService.getMine().subscribe({
      next: (supermarket) => {
        this.supermarketId = supermarket._id;
      },
      error: () => {
        alert('Erro ao carregar o supermarket. Certifica-te que estás autenticado.');
      }
    });
  }

  save(): void {
    const productData = {
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      stock: this.stock,
      image: this.image,
      supermarket: this.supermarketId 
    };

    this.productService.addProduct(productData).subscribe({
      next: () => {
        alert('Product created successfully!');
        this.router.navigate(['/supermarket-dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creating product');
      }
    });
  }
}