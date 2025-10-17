import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { Invoice } from './invoice/invoice';
import { Product } from './product/product';

export const routes: Routes = [
{ path: '', component: Home }, // Home
{ path: 'home', component: Home},
{ path: 'about', component: About},
{ path: 'cart', component: Cart},
{ path: 'checkout', loadComponent: () => import('./checkout/checkout').then(m => m.Checkout) },
{ path: 'invoice', loadComponent: () => import('./invoice/invoice').then(m => m.Invoice) },
{ path: '', loadComponent: () => import('./home/home').then(m => m.Home) },
{ path: 'product/:id', component: Product },
{ path: '**', redirectTo: '' } // fallback
];
