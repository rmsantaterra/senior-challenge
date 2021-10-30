import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';

export const PagesRoutings: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/:id', component: RegisterComponent},
  {path: '**', redirectTo: 'list'},
];
