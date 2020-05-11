import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  addressFormGroup: FormGroup;
  deliveryFormGroup: FormGroup;
  reviewFormGroup: FormGroup;
  paymentFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder , private accountService: AccountService) {}

  ngOnInit() {
    this.addressFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    });

    this.deliveryFormGroup = this.formBuilder.group({
      deliveryMethod: ['', Validators.required]

    });
    this.reviewFormGroup = this.formBuilder.group({

    });
    this.paymentFormGroup = this.formBuilder.group({
    });

    this.getAddressFormValues();
  }

   getAddressFormValues()
  {
   this.accountService.GetUserAddress().subscribe(address => {
     if (address)
     {
       this.addressFormGroup.get('firstName').patchValue(address.firstName);
       this.addressFormGroup.get('lastName').patchValue(address.lastName);
       this.addressFormGroup.get('street').patchValue(address.street);
       this.addressFormGroup.get('city').patchValue(address.city);
       this.addressFormGroup.get('state').patchValue(address.state);
       this.addressFormGroup.get('zipcode').patchValue(address.zipcode);
     }
   }, error => {
     console.log(error);
   });
  }
}
