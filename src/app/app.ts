import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Slide } from './slide/slide';
import { FooterComponent } from './footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Slide, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mini_ecommerce');

showSlide = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const current = this.router.url;

        // Hide slide & footer on About page
        if (current.startsWith('/about',)) {
          this.showSlide = false;
          this.showFooter = false;
        } 
        else if (current.startsWith('/cart',)) {
          this.showSlide = false;
          this.showFooter = false;
        } 
        else if (current.startsWith('/checkout',)) {
          this.showSlide = false;
          this.showFooter = false;
        } 
        else if (current.startsWith('/invoice',)) {
          this.showSlide = false;
          this.showFooter = false;
        }
        else if (current.startsWith('/product',)) {
          this.showSlide = false;
          this.showFooter = false;
        }
        else {
          this.showSlide = true;
          this.showFooter = true;
        }
      });
  }

}
