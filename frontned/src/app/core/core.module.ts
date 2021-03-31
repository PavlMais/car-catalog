import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService, ApiService } from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    CarService,
    ApiService
  ]
})
export class CoreModule { }
