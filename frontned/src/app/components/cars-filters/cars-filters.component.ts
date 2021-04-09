import { Component, OnInit } from '@angular/core';
import { ColorInfo, CarFilter } from '@models';
import { ColorService, CarFiltersService } from '@services';

@Component({
  selector: 'app-cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.scss']
})
export class CarsFiltersComponent implements OnInit {

  colors: ColorInfo[] = []

  filters: CarFilter = {} 
  oldestPrice = new Date()
  nowDate = new Date()

  constructor(
    private _serviceColor: ColorService,
    private _carFiltersService: CarFiltersService) { }

  ngOnInit(): void {
    this._serviceColor.getAll().subscribe(c => this.colors = c)
    this._carFiltersService.oldestPrice.subscribe(p => this.oldestPrice = p)
  }
  
  changed(key: string, value: any){

    if(key === 'priceDate') value = new Date(value);

    this._carFiltersService.updateFilters({[key]: value})
  }

}
