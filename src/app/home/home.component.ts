import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Product/product.service';

import { ActivatedRoute ,ParamMap, Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _ProductService: ProductService , private router:Router , private route:ActivatedRoute) { }

  ngOnInit() {

  }
  getCategory(category){
    console.log(category);
    this.router.navigate(['/'+category]);

    // this._ProductService.getCategory(category).subscribe(reurnedData => {
    //   console.log(reurnedData)
    // })
  }
  getAllCategory(category){
    console.log(category);
    this.router.navigate(['/Allproducts']);

    // this._ProductService.getCategory(category).subscribe(reurnedData => {
    //   console.log(reurnedData)
    // })
  }

}
