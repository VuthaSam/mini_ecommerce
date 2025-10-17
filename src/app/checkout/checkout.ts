import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout {
  shippingFlat = 1;
  customer = { name: '', phone: '', address: '', payment: 'Cash' };

  constructor(public cart: CartService, private router: Router) {}

  get total() {
    return this.cart.getCartTotal() + this.shippingFlat;
  }

  // submitOrder() {
  //   if (!this.customer.name || !this.customer.phone || !this.customer.address) {
  //     Swal.fire('Missing info', 'Please fill all required fields', 'warning');
  //     return;
  //   }

  //   const order = {
  //     customer: this.customer,
  //     items: this.cart.cart_list,
  //     total: this.total,
  //     date: new Date().toLocaleString(),
  //   };

  //   console.log('Order submitted:', order); // later: send to API here
  //   Swal.fire('Success', 'Order placed successfully!', 'success');

  //   this.cart.cart_list = [];
  //   localStorage.removeItem('cart_list');
  // }
  // inside CheckoutComponent
submitOrder() {
  if (!this.customer.name || !this.customer.phone || !this.customer.address) return;

  const order = {
    id: 'INV-' + Date.now(),              
    date: new Date().toLocaleString(),
    customer: { ...this.customer },
    items: this.cart.cart_list.map(i => ({
      id: i.id, title: i.title, price: i.price, qty: i.qty, subtotal: i.price * i.qty
    })),
    subtotal: this.cart.getCartTotal(),
    shipping: this.shippingFlat,
    total: this.cart.getCartTotal() + this.shippingFlat
  };

  // persist
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('last_order', JSON.stringify(order));   

  // clear cart for next purchase
  this.cart.cart_list = [];
  localStorage.removeItem('cart_list');

  // go to invoice
  this.router.navigate(['/invoice']);
}

}
