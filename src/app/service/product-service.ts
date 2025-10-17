import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const axios:any
declare const $:any
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: any[] = [];
    private base = 'https://fakestoreapi.com/products';
  
  constructor(private http: HttpClient) {
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
    getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

    getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
  }
}
