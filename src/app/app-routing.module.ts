import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./Product/product-list.component/product-list.component";
import { ProductDetailsComponent } from "./Product/product-details/product-details.component";
import { CartComponent } from "./Carte/cart/cart.component";
import { CheckoutComponent } from "./Product/checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";
import { ThankyouComponent } from "./thankyou/thankyou.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { LoginComponent } from "./Auth/login/login.component";
import { SignupComponent } from "./Auth/signup/signup.component";
import { CreateProductComponent } from "./Product/create-product/create-product.component";
import { HomeComponent } from './home/home.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "Allproducts", component: ProductListComponent },
  { path : "search" , component:SearchComponent},
  { path: "product-Details/:productId" , component:ProductDetailsComponent},
  { path :"create" , component:CreateProductComponent},
  { path :"edit/:productId" , component:CreateProductComponent},
  { path : "cart" , component:CartComponent},
  { path : "checkout" , component: CheckoutComponent},
  { path : "contact" , component:ContactComponent},
  { path: "thankyou" , component:ThankyouComponent},
  { path: "login" , component:LoginComponent},
  { path: "signup" , component:SignupComponent},
  { path : ":category" , component:ProductCategoryComponent},
  { path: "**" , component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
