import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-select',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './register-select.html',

  styleUrls: ['./register-select.css']
})
export class RegisterSelect {}