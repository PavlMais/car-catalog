import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models';
import { CarFilter } from 'src/app/core/models/cars_filter';
import { CarService } from 'src/app/core/services/car.service';

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
    this._serviceCar.getAll().subscribe(m => this.cars = m)
  }
}
