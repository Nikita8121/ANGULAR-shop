import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponse } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'Phone';
  cartProducts: Array<any> = []

  constructor(
    private http: HttpClient
  ) { }

  create(product: any) {
    return this.http.post<FbResponse>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map((res: any) => {
        return Object.keys(res).
          map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  getById(id: string) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: any) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: any) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type
  }

  addProduct(product: any) {
    this.cartProducts.push(product)
  }

  removeProduct(product: any) {
    this.cartProducts.forEach((el, i) => {
      if (el.id = product.id) {
        this.cartProducts.splice(i, 1)
      }
    })
  }
}
