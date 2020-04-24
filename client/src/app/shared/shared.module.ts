import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagerComponent } from './Components/pager/pager.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    PaginationModule.forRoot()
  ],
  exports: [MatPaginatorModule,
             PaginationModule,
             PagingHeaderComponent,
             PagerComponent,
             MatIconModule
            ]
})
export class SharedModule { }
