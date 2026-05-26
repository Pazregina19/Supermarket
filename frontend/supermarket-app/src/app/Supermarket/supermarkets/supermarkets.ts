import {Component,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {SupermarketService} from '../../services/supermarket';

@Component({
  selector: 'app-supermarkets',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './supermarkets.html',

  styleUrls: ['./supermarkets.css']
})
export class Supermarkets
implements OnInit {

  supermarkets: any[] = [];

  filteredSupermarkets: any[] = [];

  searchTerm: string = '';

  cityFilter: string = '';

  loading: boolean = true;

  constructor(
    private supermarketService:
    SupermarketService
  ) {}

  ngOnInit(): void {

    this.loadSupermarkets();

  }

  loadSupermarkets(): void {

    this.supermarketService
      .getAll()
      .subscribe({

        next: (response: any) => {

          this.supermarkets =
            response.filter(
              (s: any) => s.approved
            );

          this.filteredSupermarkets =
            this.supermarkets;

          this.loading = false;

        },

        error: (error: any) => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  filterSupermarkets(): void {

    this.filteredSupermarkets =
      this.supermarkets.filter(
        (supermarket: any) => {

          const matchesSearch =

            supermarket.name
              .toLowerCase()
              .includes(
                this.searchTerm
                  .toLowerCase()
              );

          const matchesCity =

            this.cityFilter === '' ||

            supermarket.location?.city
              .toLowerCase()
              .includes(
                this.cityFilter
                  .toLowerCase()
              );

          return (
            matchesSearch &&
            matchesCity
          );

        }
      );

  }

}