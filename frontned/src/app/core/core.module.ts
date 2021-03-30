import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService, ApiService } from './services';
import { SharedModule } from '../common/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    CarService,
    ApiService
  ]
})
export class CoreModule { }
