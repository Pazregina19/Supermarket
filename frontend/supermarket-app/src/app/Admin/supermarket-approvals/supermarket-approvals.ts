import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupermarketService} from '../../services/supermarket';

@Component({
  selector:
    'app-supermarket-approvals',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './supermarket-approvals.html',

  styleUrls:
    ['./supermarket-approvals.css']
})
export class SupermarketApprovals
implements OnInit {

  supermarkets: any[] = [];

  loading: boolean = true;

  constructor(
    private supermarketService:
    SupermarketService
  ) {}

  ngOnInit(): void {

    this.loadPending();

  }

  loadPending(): void {

    this.supermarketService
      .getAll()
      .subscribe({

        next: (response: any) => {

          this.supermarkets =
            response.filter(
              (s: any) =>
                !s.approved
            );

          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  approve(id: string): void {

    this.supermarketService
      .approve(id)
      .subscribe({

        next: () => {

          this.supermarkets =
            this.supermarkets.filter(
              (s: any) =>
                s._id !== id
            );

        },

        error: (error: any) => {

          console.error(error);

        }

      });

  }

}