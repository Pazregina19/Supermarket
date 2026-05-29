import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../services/sale';

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-history.html'
})
export class PurchaseHistory
implements OnInit {

  sales: any[] = [];

  constructor(
    private saleService:
    SaleService
  ) {}

  ngOnInit(): void {

    this.saleService
      .getSales()
      .subscribe({

        next: (response) => {

          this.sales =
          response;

        }

      });

  }

}