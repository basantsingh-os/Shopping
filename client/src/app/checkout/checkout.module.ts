import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutSuccessComponent,
    StepperComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [
    CheckoutComponent,
    CheckoutSuccessComponent

  ]

})
export class CheckoutModule { }
