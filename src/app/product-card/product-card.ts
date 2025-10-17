import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product: any;

  constructor(private cart: CartService) {}
  addToCart(p: any) {
    // minimal safety: needs id, title, price
    if (!p || p.id == null || p.price == null) return;

    this.cart.addToCart(p);

    Swal.fire({
      icon: 'success',
      title: 'Added to cart',
      text: `${p.title || 'Item'} added!`,
      timer: 700,
      showConfirmButton: false
    });
}
}