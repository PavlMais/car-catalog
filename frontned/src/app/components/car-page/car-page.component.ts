import { CarService } from 'src/app/core/services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent  {

  car: Car


  constructor(private _routes: ActivatedRoute) { 
    this.car = _routes.snapshot.data.car
    console.log(this.car)
  }


  // ngOnInit(): void {
  //   this._routes.data.subscribe(({car}) => {
  //     this.car = car;
  //   })
  // }

}
