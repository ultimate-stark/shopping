import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductListComponent } from "./Product/product-list.component/product-list.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { ProductModule } from './Product/product.module';
import { AngularMaterialModule } from "./angular-material.module";
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductCategoryComponent } from './product-category/product-category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
   AppComponent,
   ProductListComponent,
   HeaderComponent,
   FooterComponent,
   ContactComponent,
   ThankyouComponent,
   NotfoundComponent,
   LoginComponent,
   SignupComponent,
   HomeComponent,
   ProductCategoryComponent,
   SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ProductModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
