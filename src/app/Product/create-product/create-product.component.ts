import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from './mime-type.validator';
import { Product } from "../product.model";
import { ProductService } from '../product.service';
import {ActivatedRoute ,ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})



export class CreateProductComponent implements OnInit {
  form:FormGroup;
  imagePreview: string;
  private productId:string;
  isLoading = false;
  private mode = "create";
  private product : Product;

  constructor(public _ProductService: ProductService , private route:ActivatedRoute ) {}



  ngOnInit() {
    this.form = new FormGroup({
      name : new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      price :new FormControl(null,{validators:[Validators.required , Validators.min(0)]}),
      category: new FormControl (null, {validators:[Validators.required, Validators.minLength(3)]}),
      image : new FormControl (null, {validators:[Validators.required ], asyncValidators:[mimeType]})
    })
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('productId')){
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.mode = 'edit'
        this._ProductService.getProduct(this.productId).subscribe(returnedProduct => {
          this.isLoading = false;
          this.product = {
            id : returnedProduct._id,
            name : returnedProduct.name,
            description : returnedProduct.description,
            price: returnedProduct.price,
            category : returnedProduct.category,
            image : returnedProduct.image
          }
          this.form.setValue({
            name : returnedProduct.name,
            description : returnedProduct.description,
            price: returnedProduct.price,
            category : returnedProduct.category,
            image : returnedProduct.image
          })
        })

      }else{
        this.mode = 'create';
        this.productId = null
      }
    })


  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSaveProduct(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === "create"){
      this._ProductService.addProduct(this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.category,this.form.value.image)
    }else{
      this._ProductService.updateProduct(this.productId,this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.category,this.form.value.image)
    }

      this.form.reset();


  }



}
