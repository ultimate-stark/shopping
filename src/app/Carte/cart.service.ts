import { Injectable, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Cart } from '../Carte/cart.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/Cart/";

@Injectable({
  providedIn: 'root'
})
export class CartService{
  private cartProducts: Cart[] = [];
  private cartUpdate = new Subject<Cart[]>();
  constructor( private http:HttpClient) { }




  addToCart(name:string,image:string,price:string, amount:string){
    console.log(name);
    console.log(image);
    console.log(price);
    console.log(amount);


    // const cartData = new FormData();
    // cartData.append("name" , name);
    // cartData.append("image" , image);
    // cartData.append("price" , price);
    // cartData.append("amount" , amount);

    const cartData = {
      name:name,
      image:image,
      price:price,
      amount:amount
    }


    this.http.post<{message:string ; cart:Cart}>(BACKEND_URL , cartData).subscribe(returnedData => {
      alert(amount + " " + name + " "+ "Added To Cart")
    })


  }

  getCart() {
    this.http.get<{ message: string; carts: any }>(BACKEND_URL)
    .pipe(map((returnedData) =>{
      return returnedData.carts.map(cart => {
        return {
          id: cart._id,
          name:cart.name,
          image:cart.image,
          price:cart.price,
          amount:cart.amount
        }
      })
    }))
      .subscribe(transformedPosts => {
        this.cartProducts = transformedPosts;
        this.cartUpdate.next([...this.cartProducts])
      });
  }

  getCartUpdatedListener(){
    return this.cartUpdate.asObservable()
  }

  updateAmount(id:string,name:string,price:number,image:string,amount:number){
    console.log(id);
    console.log(name);
    console.log(price);
    console.log(image);
    console.log(amount);


  const  cartUpdated= {
      id :id,
      name:name,
      price:price,
      image:image,
      amount:amount
    }

    this.http.put<{ message: string; carts: any }>(BACKEND_URL + id , cartUpdated ).subscribe(returnedData => {
      alert( "Amount of"+" "+ name + " "+ "is Updated to " + "" + amount + " "+"Piece" )
    })
  }


  deleteItem(id:string){

    console.log(id);

    return this.http.delete(BACKEND_URL + id);

  }

  // getByName(name){
  //   console.log(name);



  //  this.http.get(BACKEND_URL +`name/${name}`).subscribe(returned => {
  //    console.log(returned)
  //  })
  // }

}
