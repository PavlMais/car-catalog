import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models';
import { CarService } from 'src/app/core/services/car.service';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
})
export class ModelsListComponent implements OnInit {


  @Input() cars: Car[] = []

  columns = [1,2,3,4,5]
  selectedColumns = 3
  l ="gride"


  constructor(private _serviceCar: CarService) { }

  ngOnInit(): void {
    console.log("prop: ", this.cars)
  }

}
