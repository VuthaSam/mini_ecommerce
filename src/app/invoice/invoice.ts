import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule, RouterLink],
  templateUrl: './invoice.html',
  styleUrl: './invoice.css'
})
export class Invoice {
  order: any;

  ngOnInit() {
    const raw = localStorage.getItem('last_order');
    this.order = raw ? JSON.parse(raw) : null;
  }

  print() { window.print(); }
}
