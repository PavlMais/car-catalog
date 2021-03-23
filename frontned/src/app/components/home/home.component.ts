import { Component, OnChanges, OnInit } from '@angular/core';
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
    console.log("Update...")
    this._serviceCar.getAll()
                    .pipe(map(ca => ca.map(c => ({...c, price: c.prices.slice(-1)[0].value}))))
                    .subscribe(m => this.cars = m);
  }
}
