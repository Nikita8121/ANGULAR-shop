import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Array<any>, type: string = ''): any {
    return products.filter(product => {
      return product.type === type
    })
  }

}
