import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // registerForm: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  errors: string [];

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
      this.firstFormGroup = this.formBuilder.group({
        displayName: ['', [Validators.required]]
      });


      this.secondFormGroup = this.formBuilder.group({
        email: ['', [Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
          [this.validateEmailNotTaken()]]});

      this.thirdFormGroup = this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$')]]
      });
      // console.log(this.secondFormGroup);
  }

  onSubmit()
  {
    const obj = {
      displayName: this.firstFormGroup.value.displayName,
      email: this.secondFormGroup.value.email,
      password: this.thirdFormGroup.value.password
    };
    // console.log(obj);
    this.accountService.register(obj).subscribe(response =>
      {
        this.router.navigateByUrl('/shop');
      }, error => {
        console.log(error);
        this.errors = error.errors;
      }
      );
  }

  validateEmailNotTaken(): AsyncValidatorFn{
    return control => {
      return timer(400).pipe(
        switchMap(() => {
          if (!control.value)
          {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res =>
              {
                return res ? {emailExists: true} : null;
              })
          );
        })
      );
    };

  }

}



