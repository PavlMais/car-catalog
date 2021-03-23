import { CarFilter } from './../../core/models/cars_filter';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Color } from 'src/app/core/models';
import { ColorService } from 'src/app/core/services/color.service';

@Component({
  selector: 'app-cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.scss']
})
export class CarsFiltersComponent implements OnInit {

  colors: Color[] = []


  @Input() filters: CarFilter = {} 

  @Output() filtersChange = new EventEmitter<CarFilter>()

  constructor(private _serviceColor: ColorService) { }

  ngOnInit(): void {
    this._serviceColor.getAll().subscribe(c => this.colors = c)
  }
  // changed(){
  //   console.log("testrsts")
  //   this.filtersChange.emit(this.filters)
  // }

}
