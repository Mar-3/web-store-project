import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  checkProducts() {
    if (localStorage.getItem('products') == null) {
      const observable:Observable<any> = this.getProducts();
      console.log(observable);
      observable.subscribe((products: any) => {localStorage.setItem('products', JSON.stringify(products.body))});
    }
    return JSON.parse(localStorage.getItem('products') || '{}');
  }

  getProducts() {
    let headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.get<any>(
      'http://localhost:8080/products/all',
      { headers: headers,
        observe: 'response'});
  }
}