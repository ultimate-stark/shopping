import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ProductService } from '..//Product/product.service';
import { ActivatedRoute ,ParamMap, Router} from '@angular/router';
import { Product } from '../Product/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit,OnDestroy {
  private category:string;
  isLoading = false;
  products: Product[] = [];
  private productSub : Subscription;

  constructor(public _ProductService: ProductService , private router:Router , private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((ParmaMap:ParamMap) =>{
      if(ParmaMap.has("category")){

        this.category = ParmaMap.get('category');
        this.isLoading = true;
        this._ProductService.getCategory(this.category);
        this.productSub =  this._ProductService.getProductsUpdateListener().subscribe((productData : {products : Product[]}) => {
          this.isLoading = false;
          this.products = productData.products;
        })



      }
    })
    
  }

  ngOnDestroy(){
    this.productSub.unsubscribe()
  }

}
