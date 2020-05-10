import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() addressFormGroup: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit() {


  }





  saveUserAddress() {

    console.log(this.addressFormGroup.value);
    this.accountService.updateUserAddress(this.addressFormGroup.value)
    .subscribe(() => {
      this.toastr.success('address saved');
    }, error => {
        this.toastr.error(error.message);
        console.log(error);
    }

    );
  }

}
