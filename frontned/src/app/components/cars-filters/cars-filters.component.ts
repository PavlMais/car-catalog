import { CarFilter } from './../../core/models/cars_filter';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColorInfo } from 'src/app/core/models';
import { ColorService } from 'src/app/core/services';
import { CarFiltersService } from 'src/app/core/services/car-filters.service';

@Component({
  selector: 'app-cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.scss']
})
export class CarsFiltersComponent implements OnInit {

  colors: ColorInfo[] = []

  filters: CarFilter = {} 

  constructor(
    private _serviceColor: ColorService,
    private _carFiltersService: CarFiltersService) { }

  ngOnInit(): void {
    this._serviceColor.getAll().subscribe(c => this.colors = c)
  }
  
  changed(key: string, value: any){

    if(key === 'priceDate') value = (value as Date).toJSON();

    this._carFiltersService.updateFilters({[key]: value})
  }

}
