import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'src/app/services/flashmessages.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  totalPrice:number = 0;
  cartJson:any;

  constructor(
    private flashMessageService:FlashMessagesService,
    private productService:ProductService,
    private router:Router) { }
    
    ngOnInit() {
      this.cartJson = this.productService.getCartStorage();
      this.totalPrice = this.productService.getTotalPrice();
    }
  onSubmit(form: NgForm){
    this.productService.newOrder(form.value).subscribe(
      (data) => {
        console.log(data);
        if(data.body['success']) {
          this.flashMessageService.newMessage("Order sent successfully!", 'success');
          this.productService.emptyCart();
          this.router.navigate(['/profile']);
        } else {
          this.flashMessageService.newMessage(
            "Error sending the order",
            'error'
          )
        }

      }
    );
  }
}
