import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  shippingFlat = 1;

  constructor(public cart: CartService) {}

  get total() {
    return this.cart.getCartTotal() + this.shippingFlat;
  }
}
