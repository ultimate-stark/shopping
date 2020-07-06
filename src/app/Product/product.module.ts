import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from '../Carte/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations:[
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    CreateProductComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule
  ]

})

export class ProductModule {}
