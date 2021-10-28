import { Routes } from '@angular/router';
import { FullComponent } from './full/full.component';

export const PagesRoutings: Routes = [
  {path: 'item', component: FullComponent},
  {path: '**', redirectTo: 'item'},
];
