import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() deliveryFormGroup: FormGroup;
  @Input() addressFormGroup: FormGroup;
  @Input() paymentFormGroup: FormGroup;
  constructor(private basketService: BasketService ,
              private checkoutService: CheckoutService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastr.success('Order created successfully');
      this.basketService.deleteLocalBasket(basket.id);
      const navigateExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navigateExtras);

    }, error => {
      this.toastr.error(error.message);
      console.log(error);
    });
  }
  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: this.deliveryFormGroup.get('deliveryMethod').value,
      shipToAddress: this.addressFormGroup.value
    };
  }
}
