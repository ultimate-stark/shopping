import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from '../product.model';
import { PageEvent } from "@angular/material";
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute ,ParamMap, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CartService} from '../../Carte/cart.service'

@Component({
  selector:'app-home',
  templateUrl:"./product-list.component.html",
  styleUrls:['./product-list.component.scss']
})



export class ProductListComponent implements OnInit , OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = false;
  form:FormGroup;
  totalProducts = 0;
  itemsPerPage = 9;
  // currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private productSub : Subscription;


  currentPage: any;
  pageActual: number = 1;

  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  options = [];
  constructor(public _ProductService: ProductService ,private router:Router ,private _CartService:CartService){

  }


  ngOnInit(){
    this.isLoading = true;
    this._ProductService.getProducts(this.itemsPerPage,this.currentPage);
    this.productSub = this._ProductService.getProductsUpdateListener().subscribe((productData : {products : Product[] , productCount:number}) => {
      this.isLoading = false;
      this.options = productData.products;
      this.totalProducts = productData.productCount;
    })

    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(''),map(val =>this.filter(val)));
  }



  // onChangedPage(pageData: PageEvent) {
  //   console.log(pageData);
  //   this.isLoading = true;
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.productsPerPage = pageData.pageSize;
  //   this._ProductService.getProducts(this.productsPerPage, this.currentPage);
  // }

  filter(val: string): string[] {
    console.log(val);
    return this.options.map(x => x.name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  // filter(val: string) {
  //   this.filteredProducts = (val) ?
  //   this.options.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  //   : this.products;
  // }


  onPageChange(page: number) {
    console.log(page);
    this.currentPage = 3;
    // this.productsPerPage = 9;
    // this._ProductService.getProducts(this.itemsPerPage, this.currentPage);
    window.scrollTo({top:100, behavior: 'smooth'});
 }












 clicko(value){
  console.log(value);
  this.router.navigate(['/search'], { queryParams: { q: `${value}` }});
 }













  ngOnDestroy(){
    this.productSub.unsubscribe()
  }
}
