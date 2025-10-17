import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { Invoice } from './invoice/invoice';

export const routes: Routes = [
{ path: '', component: Home }, // Home
{ path: 'home', component: Home},
{ path: 'about', component: About},
{ path: 'cart', component: Cart},
{ path: 'checkout', loadComponent: () => import('./checkout/checkout').then(m => m.Checkout) },
{ path: 'invoice', loadComponent: () => import('./invoice/invoice').then(m => m.Invoice) },

//   {
//     path: 'product/:id',
//     loadComponent: () =>
//       import('./product-detail/product-detail.component')
//     .then(m => m.ProductDetailComponent)
//   },
//   {
//     path: 'cart',
//     loadComponent: () =>
//       import('./cart/cart.component')
//     .then(m => m.CartComponent)
//   },
  { path: '**', redirectTo: '' } // fallback
];
