import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from './flashmessages.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private flashMessageService:FlashMessagesService) { }

  getProductsStorage() {
    const productsObject = JSON.parse(localStorage.getItem('products') || '{}');
    return productsObject;
  }

  getProducts() {
    return this.http.get<any>(
      'https://ultra-ridge-392020.lm.r.appspot.com/products/all',
      {observe: 'response'});
  }

  addToCart(id:string) {
    const productDb = this.getProductsStorage();
    const cartRaw = localStorage.getItem('cart');
    let cartJson:Array<Object> = JSON.parse(cartRaw || '[]');
    const newProduct:any = productDb.find((item:any) => (item._id===id));
    cartJson.push(newProduct);
    localStorage.setItem('cart', JSON.stringify(cartJson));
    this.flashMessageService
    .newMessage(
      'Product '.concat(newProduct.name,' has been added to your cart!'),'success')
    console.log(cartJson);
    }

  }
