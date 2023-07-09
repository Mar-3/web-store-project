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
    if (localStorage.getItem('products') === null) {
      this.productService.getProducts()
      .subscribe(
        (data) => {
          localStorage.setItem('products',JSON.stringify(data.body));
          this.products = this.productService.getProductsStorage();
        })

    } else {
      this.products = this.productService.getProductsStorage();
    }
    };

    addToCart(id:string) {
      const quantity = 
      Number.parseInt(document.getElementById(id)?.getAttribute('value') as string);
     
      this.productService.addToCart(id, quantity as number);
    }
    showProduct(id:string) {
      console.log(id);
    }

  }