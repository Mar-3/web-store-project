import { Component} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';

let products:Observable<Array<any>>;
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  

  
  constructor(
    private productService:ProductService,
    private router:Router) {}

  products:any = new Array;
  ngOnInit() {
    this.getProducts();
    }

    getProducts() {
      if (localStorage.getItem('products') === null) {
      this.productService.getProducts()?.subscribe(data => {
        localStorage.setItem('products',JSON.stringify(data.body));
        data.body.forEach((product:any) => {
          this.products.push(product);
        })
      })
    } else {
      JSON.parse(localStorage.getItem('products')|| '{}').forEach((product:any) => {
        this.products.push(product);
      })
    }
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