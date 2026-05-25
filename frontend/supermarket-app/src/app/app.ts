import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Supermarket Marketplace';
  constructor(private auth: AuthService) {}

  logedIn(): boolean {
    return this.auth.logedIn();
  }
}
