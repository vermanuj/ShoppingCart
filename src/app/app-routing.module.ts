import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {ProductDetailComponent} from './product.edit.component';
import {ViewCartComponent} from './product.viewCart.component';
const routes: Routes = [
  {
    path: 'products',
    component: PostCreateComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Detail' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
