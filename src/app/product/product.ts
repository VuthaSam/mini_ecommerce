import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../service/product-service';  // adjust if folder name is "services" (add s)
import { Observable } from 'rxjs';
import { CartService } from '../service/cart-service';



declare const Swal:any;
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class Product implements OnInit{
  product: any;
  loading = true;
  product$!: Observable<any>;
  
constructor(private route: ActivatedRoute, private ps: ProductService, private cart: CartService) {}

  addToCart(p: any) {

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
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.ps.getProduct(id);
  }
}
