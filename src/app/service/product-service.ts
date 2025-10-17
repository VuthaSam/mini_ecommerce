import { Injectable } from '@angular/core';

declare const axios:any
declare const $:any
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: any[] = [];
  
  constructor() {
    let vm = this;
    $.LoadingOverlay("show");
    axios.get('https://fakestoreapi.com/products')
  .then(function (response:any) {
    // handle success
    console.log(response.data);
    vm.product = response.data; 
  })
  .catch(function (error:any) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    $.LoadingOverlay("hide");
  });
  }
  getProduct() {
    return this.product
  }
}
