import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  returnUrl: string;

  // emailFormControl = new FormControl('', [
  //   Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  // Validators.pattern('(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'? /&gt;.&lt;,])(?!.*\s).*$')
  // ]);




  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {}

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], [this.validateEmailNotExists()]
    ]
    });
    this.secondFormGroup = this.formBuilder.group({
      password: ['', Validators.required
    ]
    });



  }

  onSubmit()
  {
    const obj = {
      email: this.firstFormGroup.value.email,
      password: this.secondFormGroup.value.password
    };

    // console.log(obj);
    this.accountService.login(obj).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);

    }, error => {
      console.log(error);
    });

  }

  validateEmailNotExists(): AsyncValidatorFn{
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value)
          {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res =>
              {
                return res ? null :  {emailNotExists: true};
              })
          );
        })
      );
    };

  }
}


