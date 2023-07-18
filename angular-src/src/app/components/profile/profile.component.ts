import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent{
  orders:Array<any> = [];
  user:any;


  constructor(
    private authService:AuthService,
    private router:Router,
    private productService:ProductService
  ) {}
  
  ngOnInit() {
    let productIndex;
  this.user = <JSON>this.authService.getProfile();
  this.authService.getUserOrders()
  .subscribe(
    (data) => {
      console.log(' subscrie start')
      const productDb = this.productService.getProductsStorage();
      console.log(productDb);
      this.orders = data.body.orders;
      console.log('orders',this.orders);

      // combining product ids with the database to print 
      // the ordered items
      this.orders.forEach((order:any, index:number, orders:Array<any>) => {
          orders[index].products.forEach((product:any, index:number, products:any) => {
            let quantity = products[index].quantity;
            productIndex =
              productDb.findIndex((item:any) => {
                return item._id == products[index].id;
              });
              products[index] = productDb[productIndex];
              products[index].quantity = quantity;
            }
          );
          let totalPrice = 0;
          orders[index]
          .products.forEach((product:any, index:number, products:any) => {
            totalPrice+= +products[index].price * +products[index].quantity;
          })
          orders[index].totalPrice = totalPrice;
      })
    console.log('orders',this.orders);
    });
  }
}