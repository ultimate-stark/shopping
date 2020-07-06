import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , ParamMap ,Router} from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CartService } from '../../Carte/cart.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  isLoading = false;
  private productId :string;
  product : Product;





  constructor(private _ProductService:ProductService , private route: ActivatedRoute , private router:Router ,private _CartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if(paramMap.has('productId')){
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this._ProductService.getProduct(this.productId).subscribe(returnedProduct =>{
          this.isLoading = false;

          this.product = {
            id : returnedProduct._id,
            name : returnedProduct.name,
            description : returnedProduct.description,
            price: returnedProduct.price,
            category : returnedProduct.category,
            image : returnedProduct.image
          }


        })
      }
    })
  }


  onDelete(productId: string) {
    console.log(productId)
    this._ProductService.deleteProduct(productId).subscribe(returned => {
      this.router.navigate(['/']);
    })

  }

  addToCart(name,image,price, amount){
    // console.log(name);
    // console.log(image);
    // console.log(price);
    // console.log(amount);



    this._CartService.addToCart(name,image,price,amount);
  }

}
