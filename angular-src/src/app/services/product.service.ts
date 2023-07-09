import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from './flashmessages.service';

class Product {
  _id:string | undefined;
  name:string | undefined;
  category:string | undefined;
  description: string | undefined;
  price: number | undefined;
  img: string | undefined;
  quantity:number | undefined;
}

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

  getCartStorage() {
    const cartRaw = localStorage.getItem('cart');
    let cartJson:Array<Product> = JSON.parse(cartRaw || '[]');
    return cartJson;    
  }
  saveCartStorage(cartJson:Object) {
    localStorage.setItem('cart', JSON.stringify(cartJson));
  }

  addToCart(id:string, quantity: number) {
    // Get database of all products and find the new item
    const productDb = this.getProductsStorage();
    const newProduct:Product = productDb.find((item:Product) => (item._id===id));
    // Get current shopping cart seek if new product 
    // already in cart
    let cartJson = this.getCartStorage();
    const cartIndex:number =
      cartJson.findIndex((item:Product) => {
        return(item._id == id);
      });
    
    // If not found: set quantity to 1 and add to cart
    console.log('cartIndex:', cartIndex)
    if (cartIndex == -1) {
      console.log('new product')
      newProduct.quantity = 1
      cartJson.push(newProduct);
    } else {
      // If found: increase quantity
      const newQuantity = +cartJson.at(cartIndex)!
      .quantity! + +quantity ;
      cartJson.at(cartIndex)!.quantity! = newQuantity;
    }
    localStorage.setItem('cart', JSON.stringify(cartJson));
    this.flashMessageService
    .newMessage(
      'Product '.concat(newProduct.name!,' has been added to your cart!'),'success')
    console.log(cartJson);
    }
    
  }
