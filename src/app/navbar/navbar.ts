import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public cart: CartService) {}
}
