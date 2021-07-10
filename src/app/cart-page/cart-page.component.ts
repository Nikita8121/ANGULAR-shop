import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Array<any> = []
  totalPrice = 0

  form: FormGroup
  submitted: boolean = false

  constructor(
    private productServ: ProductService,
    private orderServ: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts
    this.cartProducts.forEach(el => this.totalPrice += +el.price)
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit () {
    if(this.form.invalid) {
      return;
    }
    this.submitted = true;
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.form.value.totalPrice,
      date: new Date()
    }

    this.orderServ.create(order).subscribe(res => {
      this.form.reset()
      this.cartProducts = []
      this.submitted = false;
    }) 
    

  }
  
  remove(product: any): void {
    this.totalPrice -= product.price
    this.productServ.removeProduct(product)
  }
}
