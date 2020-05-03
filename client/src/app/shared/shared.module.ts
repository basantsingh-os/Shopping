import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagerComponent } from './Components/pager/pager.component';
import { MatIconModule } from '@angular/material/icon';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './Components/order-total/order-total.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    PaginationModule.forRoot(),
    CarouselModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [MatPaginatorModule,
             PaginationModule,
             PagingHeaderComponent,
             PagerComponent,
             MatIconModule,
             CarouselModule,
             OrderTotalComponent,
             ReactiveFormsModule,
             MatMenuModule,
             MatExpansionModule
            ]
})
export class SharedModule { }
