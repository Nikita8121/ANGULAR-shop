import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<any>

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productServ.getById(params['id'])
    }))
  }

  addProduct(product: any) {
    this.productServ.addProduct(product)
  }

}
