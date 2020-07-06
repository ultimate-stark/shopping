import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../Carte/cart.service';
import {Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import { Cart } from '../../Carte/cart.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit ,OnDestroy {
  cart: Cart[] = [];
  private cartSub : Subscription;
  
  isLoading = false;

  constructor(private _CartService:CartService ,private http:HttpClient ,private router:Router) { }

  ngOnInit() {
    this._CartService.getCart();
    this.cartSub = this._CartService.getCartUpdatedListener().subscribe(returnedData => {
      this.cart = returnedData
    })
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe();
  }


}
