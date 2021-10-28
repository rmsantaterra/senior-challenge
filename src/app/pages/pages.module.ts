import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { PagesRoutings } from './pages-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FullComponent } from './full/full.component';


@NgModule({
  declarations: [
    ListComponent,
    RegisterComponent,
    FullComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutings),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ]
})
export class PagesModule { }
