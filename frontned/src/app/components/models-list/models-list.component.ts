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


  constructor(private _serviceCar: CarService) { }

  ngOnInit(): void {
    //this._serviceCar.getAll().subscribe(m => this.cars = m)
  }

}
