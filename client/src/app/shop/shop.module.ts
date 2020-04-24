import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { SharedModule } from '../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';





@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    ShopRoutingModule,
    CoreModule

  ],
  exports: []
})
export class ShopModule { }
