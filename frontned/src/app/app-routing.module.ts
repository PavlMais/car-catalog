import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './components/car-page/car-page.component';
import { HomeComponent } from './components/home/home.component';
import { CarPageResolverService } from './resolvers/car-page-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car/:id', component: CarPageComponent, resolve: {car: CarPageResolverService}}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
