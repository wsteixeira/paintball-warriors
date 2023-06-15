import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'customer', component: CustomerListComponent },
  { path: 'customer/edit/:id', component: CustomerEditComponent },
  { path: 'customer/new', component: CustomerEditComponent },
  { path: 'user', component: UserListComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/new', component: UserEditComponent },
  { path: '**', redirectTo: '/customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
