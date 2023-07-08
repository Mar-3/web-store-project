import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  
  products:any;
  constructor(private productService:ProductService, private router:Router) {

  }
  ngOnInit() {
    this.products = this.productService.checkProducts();
    console.log(this.products)
  }
  // placeholder for store products

}
