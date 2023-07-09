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
    this.cartJson?.forEach((element:any) =>
    {this.totalPrice+=Number.parseFloat(element.price);(this.totalPrice)})
    
  }

  updateAmount(id:string, quantity:number) {
    for (let i = 0; i < quantity; i++) {
    }
  }



}
