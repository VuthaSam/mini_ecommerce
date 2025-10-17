import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../service/product-service';
import { Observable } from 'rxjs';


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
  products$!: Observable<any[]>;
  constructor(private product_service : ProductService) {}

  products: Product[] = [];
  filtered: Product[] = [];
  cat = 'All';

    private cat_map: any = {
      all: 'All',
      "men clothes": "men's clothing",
      men: "men's clothing",
      "women clothes": "women's clothing",
      women: "women's clothing",
      electronics: "electronics",
      jewelry: "jewelery",
      jewelery: "jewelery"
    };

  ngOnInit() {
    this.product_service.getProducts().subscribe(list => {
    this.products = list;
    this.applyFilter();
    });
  }

  setCat(c: string) {
    const key = c.trim().toLowerCase();
    // this.cat = c;
    this.cat = this.cat_map[key] ?? 'All';
    this.applyFilter();
  }

  applyFilter() {
      if (this.cat === 'All') {
        this.filtered = this.products;
        return;
      }
    const wanted = this.cat.toLowerCase();
    this.filtered = this.products.filter(p => (p.category || '').toLowerCase() === wanted);
}
}