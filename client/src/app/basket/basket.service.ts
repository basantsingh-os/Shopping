import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IBasket, IBasketItem, Basket, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string)
  {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

setBasket(basket: IBasket){
  return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) =>
  {
    this.basketSource.next(response);
    this.calculateTotals();
  }, error => {
    console.log(error);
  }
  );
}

getCurrentBasketvalue()
{
  return this.basketSource.value;
}


addItemToBasket(item: IProduct, quantity = 1) {
  const itemToAdd: IBasketItem = this.mapProductItemToVasketItem(item , quantity);
  let basket = this.getCurrentBasketvalue();
  if (basket === null) {
   basket = this.createBasket();
  }
  basket.items = this.addOrUpdateItem(basket.items, itemToAdd , quantity);
  this.setBasket(basket);
}

private calculateTotals(){
  const basket = this.getCurrentBasketvalue();
  const shipping = 0;
  const subtotal = basket.items.reduce( (a , b) => (b.price * b.quantity) + a, 0);
  const total = subtotal + shipping;
  this.basketTotalSource.next({shipping, total, subtotal});

}

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    // this method will check whether item is present if it is not thenit will cretate a basket

    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else{
      items[index].quantity += quantity;
   }
    return items;

  }
 private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);  // help to retrieve basket after shutting down application this is browser specific
    return basket;
}
 private mapProductItemToVasketItem(item: IProduct, quantity: number): IBasketItem {
    return{
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }





}