import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
   @Input()   deliveryFormGroup: FormGroup;
   deliveryMethods: IDeliveryMethod[];
  //  favoriteSeason: string;
  //  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit() {
    this.checkoutService.GetDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    }
    );
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod)
  {
    this.basketService.setShippingPrice(deliveryMethod);
  }


}



// <div class="row">
// <div class="col-6 form-group" *ngFor ="let method of deliveryMethods" >
// <input type="radio" id="{{method.id}}" value="{{method.id}}"  class="custom-control-input" >
// <label for="{{method.id}}" class="custom-control-label">
// <strong>{{method.shortName}}-{{method.price}}</strong>
// <br>
// <span class="label-description">{{method.description}}</span>
// </label>
// </div>
// </div>

