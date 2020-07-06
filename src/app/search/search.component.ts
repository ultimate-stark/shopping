import { Component, OnInit ,OnDestroy } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { Observable, Subject, asapScheduler, pipe, of, from,
  interval, merge, fromEvent } from 'rxjs';
import { ProductService } from '../Product/product.service';
import { ActivatedRoute ,ParamMap, Router} from '@angular/router';
import { Product } from '../Product/product.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit,OnDestroy {
  query: string;
  private category:string;
  isLoading = false;
  products: Product[] = [];
  private productSub : Subscription;
  constructor(private route: ActivatedRoute , private _ProductService:ProductService) { }

  ngOnInit() {
    this.route.queryParams.pipe(filter(params => params.q)).subscribe(params => {
        console.log(params); // {q: "popular"}

        this.query = params.q;
        console.log(this.query); // popular
      });
      this._ProductService.getByName(this.query);
      this.productSub =  this._ProductService.getProductsUpdateListener().subscribe((productData : {products : Product[]}) => {
        this.isLoading = false;
        this.products = productData.products;
      })

  }
  ngOnDestroy(){
    this.productSub.unsubscribe()
  }

}
