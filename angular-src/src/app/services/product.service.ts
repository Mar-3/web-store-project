import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from './flashmessages.service';
import { ObjectExpression } from 'mongoose';
import { AuthService } from './auth.service';

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
    private flashMessageService:FlashMessagesService,
    private authService:AuthService) { }
    

  getProductsStorage() {
    if (localStorage.getItem('products') === null) {
      this.getProducts()
      .subscribe(
        (data) => {
          localStorage.setItem('products',JSON.stringify(data.body));
          return JSON.parse(localStorage.getItem('products') || '{}');;
        })
      }
    else {       
      return JSON.parse(localStorage.getItem('products') || '{}');;
    }
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

  updateQuantity(id:string, quantity:number) {
    const cartJson = this.getCartStorage();
    console.log('new quantity',quantity)
    // remove if quantity 0 or negative, else update amount
    if (quantity < 1) {
        cartJson.splice(
        cartJson.findIndex((item:Product) => {
          return(item._id == id)
        }), 1
      )
    } else {
      cartJson.at(
        cartJson.findIndex((item:Product) => {
          return(item._id == id)
        })
      )!.quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cartJson));
    console.log('Updated quantity');
  }

  emptyCart() {
    localStorage.removeItem('cart');
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
      console.log('newQuantity ', newQuantity)
    }
    // Save new updated cart to localstorage
    localStorage.setItem('cart', JSON.stringify(cartJson));
    this.flashMessageService
    .newMessage(
      'Product '.concat(newProduct.name!,' has been added to your cart!'),'success')
    console.log(cartJson);
    }
    
    getTotalPrice() {
      let totalPrice:number = 0 ;
      const cartJson = this.getCartStorage();
      cartJson.forEach( (element:any) => {
        totalPrice += element.price*element.quantity;
      });
      return totalPrice;
    }


    newOrder(address:any) {
      this.authService.loadToken();
      const userId = 
        JSON.parse(localStorage.getItem('user') || '{}').id;
      const now = Date.now();
      let products:any = [];
      this.getCartStorage()
      .forEach(item => {
        products.push({
          'id':item._id,
          'quantity':item.quantity
        });
        });
      const newOrder = {
        'products': products,
        'address': address,
        'userId':userId,
        'date':now.toString()
      }

      console.log(newOrder);
      let headers = new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.authService.authToken,
      });
      return this.http.post<any>(
        'http://localhost:8080/orders/new',
        newOrder, 
        {observe: 'response',
        headers:headers},);
    } 
  }
