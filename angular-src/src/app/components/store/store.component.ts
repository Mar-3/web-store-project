import { Component} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { compileDeclareClassMetadata } from '@angular/compiler';

const placeholders = JSON.parse(
  '[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]'
)

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  
  products:any = placeholders;

  

  constructor(
    private productService:ProductService,
    private router:Router) {}

  ngOnInit() {
      this.products = this.productService.getProductsStorage();
    }

    addToCart(id:string) {
      const quantity = 
      Number.parseInt((<HTMLInputElement>document.getElementById(id)).value);
      console.log(quantity);
      this.productService.addToCart(id, quantity);
    }
    showProduct(id:string) {
      console.log(id);
    }

  }