import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  ProductService
} from '../../services/product';

@Component({
  selector: 'app-product-detail',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
  './product-detail.html',

  styleUrls: [
    './product-detail.css'
  ]
})
export class ProductDetail
implements OnInit {

  product: any;

  loading: boolean = true;

  constructor(

    private route:
    ActivatedRoute,

    private productService:
    ProductService

  ) {}

  ngOnInit(): void {

    const id =
    this.route.snapshot.paramMap
      .get('id');

    if(id) {

      this.productService
        .getById(id)
        .subscribe({

          next: (response: any) => {

            this.product =
              response;

            this.loading =
              false;

          },

          error: (error: any) => {

            console.error(error);

            this.loading =
              false;

          }

        });

    }

  }

}