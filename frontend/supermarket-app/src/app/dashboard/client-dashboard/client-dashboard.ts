import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import{ ClientProfile } from '../../Profiles/client-profile/client-profile';

@Component({
  selector: 'app-client-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css',
})
export class ClientDashboard {}
