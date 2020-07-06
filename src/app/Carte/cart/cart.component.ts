import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import {Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import { Cart } from '../cart.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,OnDestroy {
  cart: Cart[] = [];
  private cartSub : Subscription;
  private cartSubbbbb: Subscription
  isLoading = false;

  constructor(private _CartService:CartService,private http:HttpClient ,private router:Router ) { }

  ngOnInit() {
    this._CartService.getCart();
    this.cartSub = this._CartService.getCartUpdatedListener().subscribe(returnedData => {
      this.cart = returnedData
    })
  }

  updateAmount(id ,name,price,image, amount){
    // console.log(id);
    // console.log(name);
    // console.log(price);
    // console.log(image);
    // console.log(amount);

    this._CartService.updateAmount(id,name,price,image,amount);
    this.isLoading = true;
    this.isLoading = false;
    }

    delete(id){
      this.isLoading = true;
      this._CartService.deleteItem(id).subscribe(() => {
        this._CartService.getCart();
      }, () => {
        this.isLoading = true;
      });
      this.isLoading = true;
      this.isLoading = true;this.isLoading = true;this.isLoading = true;this.isLoading = true;this.isLoading = true;this.isLoading = true;
      this.isLoading = false;
    }


  ngOnDestroy(){
    this.cartSub.unsubscribe();

  }


}
