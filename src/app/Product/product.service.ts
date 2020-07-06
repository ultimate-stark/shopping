import { Injectable } from "@angular/core";
import { Product }  from  './product.model';
import { HttpClient } from "@angular/common/http";
import { environment }  from '../../environments/environment';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


const BACKEND_URL = environment.apiUrl + "/products/"



@Injectable({ providedIn: "root" })

export class ProductService{
  private products: Product[] = [];
  private productUpdated = new Subject<{}>()

  constructor(private http: HttpClient ,private router: Router){

  }


  addProduct(name:string,description:string,price:string,category:string,image:File){

    const productData = new FormData();
    productData.append("name" , name);
    productData.append("description" , description);
    productData.append("price" , price);
    productData.append("category" , category);
    productData.append('image' , image , name);  // formData.append(name, value, filename);

    this.http.post<{ message: string; product: Product }>(BACKEND_URL , productData).subscribe(responseData => {
      this.router.navigate(["/"]);
    })
  }


  updateProduct(id:string,name:string,description:string,price:string,category:string,image: File | string){
    // console.log(image.name)
    // var moham = image.name;
    // console.log(moham)
    let productData: Product | FormData;
    if (typeof image === "object"){
      productData = new FormData();
      productData.append("id" , id);
      productData.append("name" , name);
      productData.append("description" , description);
      productData.append("price" , price);
      productData.append("category" , category);
      productData.append('image' , image , name );
      // productData.append("aaaa" , moham);  // formData.append(name, value, filename);
      }else{
        productData = {
          id: id,
          name:name,
          description:description,
          price:price,
          category:category,
          image:image
        }
      }



    this.http.put<{ message: string; product: Product }>(BACKEND_URL + id  , productData).subscribe(responseData => {
  console.log(responseData)
    })
  }

  getProducts(postsPerPage: number, currentPage: number){
    // console.log(postsPerPage)
    // console.log(currentPage)
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; products: any; maxProducts: number }>(BACKEND_URL + queryParams).pipe(map(returnedData => {
      // console.log(returnedData.products)
      return {
        products : returnedData.products.map(product => {
          // console.log(typeof product)
          // console.log(product)
          return{
            name :product.name,
            description : product.description,
            price :product.price,
            category:product.category,
            image:product.image,
            id:product._id
          }
        }),
        maxProducts : returnedData.maxProducts
      }
    })).subscribe(returnedProducts =>{
      // console.log(returnedProducts)
      // console.log(returnedProducts.products)
      this.products = returnedProducts.products;
      this.productUpdated.next({
        products : [...this.products],
        productCount : returnedProducts.maxProducts
      })
    })

  }

  getProductsUpdateListener(){
    return this.productUpdated.asObservable()
  }

  getProduct(id:string){
    return this.http.get<{_id:string;name:string;description:string;price:number;category:string; image:string}>(BACKEND_URL + id)
  }


  getCategory(category){
    // console.log(category);
    // const queryParams = `?category=${category}`;
    // console.log(queryParams);
     this.http.get<{categoryProducts:any}>(BACKEND_URL +`category/${category}`).pipe(map(returnedData => {
       return{
        category : returnedData.categoryProducts.map(product => {
         return{
          name :product.name,
          description : product.description,
          price :product.price,
          category:product.category,
          image:product.image,
          id:product._id
         }
       })
      }
     })).subscribe(returnedCategory => {
      console.log(returnedCategory.category);
       this.products = returnedCategory.category;
       this.productUpdated.next({
         products : [...this.products]
       })
     })
  }

  getByName(value){
    this.http.get<{categoryProducts:any}>(BACKEND_URL +`ByName/${value}`).pipe(map(returnedData => {
      return{
       category : returnedData.categoryProducts.map(product => {
        return{
         name :product.name,
         description : product.description,
         price :product.price,
         category:product.category,
         image:product.image,
         id:product._id
        }
      })
     }
    })).subscribe(returnedCategory => {
      //  console.log(returnedCategory.category.length);
       this.products = returnedCategory.category;
       this.productUpdated.next({
         products : [...this.products]
       })
     })
  }


  deleteProduct(productId: string) {
    console.log(productId)
    return this.http.delete(BACKEND_URL + productId);
  }

}
