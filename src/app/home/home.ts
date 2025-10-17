import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../service/product-service';
import { interval } from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  constructor(public product_service : ProductService) {}

  products: Product[] = [];
  filtered: Product[] = [];
  cat = 'All';
  interval:any;

  ngOnInit() {
    setTimeout(() => {
      this.products = this.product_service.getProduct();
      this.filtered = this.products
    },1500);
    // this.product_service.getProduct().subscribe(list => {
    // this.products = list;
    // this.applyFilter();
    // });

    //     // keep checking until products are loaded from service
    // this.interval = setInterval(() => {
    //   const list = this.product_service.getProduct();
    //   if (list && list.length > 0) {
    //     this.products = list;
    //     this.applyFilter();
    //     clearInterval(this.interval); // stop checking once loaded
    //   }
    // }, 300); // check every 0.3 seconds
  }

  setCat(c: string) {
    this.cat = c;
    this.applyFilter();
  }

  applyFilter() {
    if (!this.products || this.products.length === 0) return;

    if (this.cat === 'All') {
      this.filtered = this.products;
      return;
    }

    // 🔹 Map short category to real category name
    const map: any = {
      men: "men's clothing",
      women: "women's clothing",
      ele: 'electronics',
      jewelery: 'jewelery'
    };

    const key = map[this.cat] || this.cat;

    this.filtered = this.products.filter(
      p => (p.category || '').toLowerCase() === key.toLowerCase()
    );
  }
}
