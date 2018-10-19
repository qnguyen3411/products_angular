import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'products', component: IndexComponent},
  {path: 'products/:id', component: EditComponent},
  {path: 'new', component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
