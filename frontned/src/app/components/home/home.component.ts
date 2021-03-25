import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models';
import { CarFilter } from 'src/app/core/models/cars_filter';
import { CarService } from 'src/app/core/services/car.service';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = []

  filters: CarFilter = {
    priceFrom: undefined,
    priceTo: undefined,
    priceDate: undefined,
    color: undefined,
    engineValue: undefined
  }

  constructor(private _serviceCar: CarService) { }

  ngOnInit(): void {
    this._serviceCar.getAll()
    // .pipe(map(ca => ca.map(c => ({...c}))))
    .subscribe(m => this.cars = m);
    //this.cars = [{engineVolume: 343, prices: [43], description: '43', colorId:3, brandId:3, modelId:3}]
  }
  
  filtersChange(){
    console.log("Update...")
    console.log(this.cars)

  }
}
