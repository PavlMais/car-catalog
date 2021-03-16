import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './services/car.service';
import { ApiService } from './services/api.service';
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
