import { Component } from '@angular/core';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent {

  cartJson:any = undefined;

  totalPrice:number = 0;

  constructor(private flashMessageService: FlashMessagesService,
    private productService: ProductService) {}

  ngOnInit(){
    this.cartJson = this.productService.getCartStorage();
    this.totalPrice = this.productService.getTotalPrice();
  }

  removeProduct(id:string) {
    this.productService.updateQuantity(id, 0);
    
  };
  updateQuantity(id:string) {
    console.log(id);
    console.log('updateQuantity');
    const quantity:number =
      Number.parseInt((<HTMLInputElement>document.getElementById('quantity'+id)).value);
    this.productService.updateQuantity(id, quantity);
    this.cartJson = this.productService.getCartStorage();
    this.totalPrice = this.productService.getTotalPrice();
  }

}
