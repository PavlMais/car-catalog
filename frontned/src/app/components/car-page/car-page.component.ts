import { DialogService } from 'primeng/dynamicdialog';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CarService } from 'src/app/core/services';
import { CarInfo } from 'src/app/core/models';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { UIChart } from "primeng/chart/chart";

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent  {

  @ViewChild("chart") chart: UIChart | undefined

  car: CarInfo
  charData: any

  constructor(
    _routes: ActivatedRoute, 
    private _router: Router,
    private _dialogService: DialogService,
    private _carService: CarService,
    private _confirmService: ConfirmationService) {
       
    this.car = _routes.snapshot.data.car
  }

  update(){
    this._carService.getById(this.car.id).subscribe(c => {
      this.car = c
      this.charData = {
        labels: this.car.prices.map(p => p.createdAt),
        datasets: [
          {
            label: 'Price',
            data: this.car.prices.map(p => p.value),
            fill: true,
            borderColor: '#42A5F5'
          }
        ]
      }
    })
  }

  ngOnInit(): void {
    this.update()
  }

  edit(){
    this._dialogService.open(CarDialogComponent, { data: { car: this.car }})
      .onClose.subscribe(_ => this.update())
  }

  delete(){
    this._confirmService.confirm({
      message: 'Delete car?',
      accept: () => {
          this._carService.delete(this.car.id)
          this._router.navigateByUrl('/')
      }
    });
  }
}
