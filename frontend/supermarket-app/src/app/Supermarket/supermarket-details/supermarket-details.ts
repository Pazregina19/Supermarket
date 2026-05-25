import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SupermarketService} from '../../services/supermarket';

@Component({
  selector: 'app-supermarket-details',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './supermarket-details.html',

  styleUrls:
    ['./supermarket-details.css']
})
export class SupermarketDetails
implements OnInit {

  supermarket: any;

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private supermarketService:
    SupermarketService
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot
        .paramMap.get('id');

    if (id) {

      this.supermarketService
        .getById(id)
        .subscribe({

          next: (response: any) => {

            this.supermarket =
              response;

            this.loading = false;

          },

          error: (error: any) => {

            console.error(error);

            this.loading = false;

          }

        });

    }

  }

}