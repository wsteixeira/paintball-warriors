import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Paintball Warriors';

  constructor(private router: Router) {}

  onCustomers() {
    this.router.navigate(['customer']);
  }
  onUsers() {
    this.router.navigate(['user']);
  }
}
