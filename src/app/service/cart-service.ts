import { Injectable } from '@angular/core';
declare const Swal: any;
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart_list: any[] = [];

  constructor() {
    const saved = localStorage.getItem('cart_list');
    this.cart_list = saved ? JSON.parse(saved) : [];
  }

  //  Add to cart
  addToCart(product: any) {
    const found = this.cart_list.find(item => item.id === product.id);

    if (found) {
      found.qty++;
    } else {
      this.cart_list.push({ ...product, qty: 1 });
    }

    this.save();
  }

  // Remove one item completely
  removeItem(product: any) {
    Swal.fire({
    title: "Are you sure?",
    text: "Do you want to remove this item from cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!"
  }).then((result:any) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    this.cart_list = this.cart_list.filter(item => item.id !== product.id);
    this.save();
  }
  });
  }

  // Increase quantity
  increaseQty(index: number) {
    this.cart_list[index].qty++;
    this.save();
  }

  // Decrease quantity
  decreaseQty(index: number) {
    if (this.cart_list[index].qty > 1) {
      this.cart_list[index].qty--;
    } else {
        Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this item from cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
  }).then((result:any) => {
    if (result.isConfirmed) {
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
      this.cart_list.splice(index, 1);
    }
}); 
    }
    this.save();
  }

  //  Get subtotal (sum of all items)
  getCartTotal(): number {
    return this.cart_list.reduce((total, item) => total + item.price * item.qty, 0);
  }

  // Get total quantity (all items)
  getTotalQty(): number {
    return this.cart_list.reduce((sum, item) => sum + item.qty, 0);
  }

  // Save to localStorage
  private save() {
    localStorage.setItem('cart_list', JSON.stringify(this.cart_list));
  }
}
