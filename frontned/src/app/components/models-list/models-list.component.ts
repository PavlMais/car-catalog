import { Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ContextMenu } from 'primeng/contextmenu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { CarInfo } from '@models';
import { CarService, CarFiltersService } from '@services';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
})
export class ModelsListComponent {

  @ViewChild("cm") cm: ContextMenu | undefined;

  cars: CarInfo[] = []

  selectedCar: CarInfo | undefined

  contextItems: MenuItem[] = [] 

  selectedColumns = 3
  limit = this.selectedColumns * 5


  constructor(
    private _serviceCar: CarService,
    private _dialogService: DialogService,
    private _confirmService: ConfirmationService,
    private _carFilterService: CarFiltersService) { 

      _carFilterService.cars.subscribe(cars => this.cars = cars)
      _carFilterService.filters.next({}) // TODO:
    }
    
    
    ngOnInit() {
      this.contextItems = [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: (_) => { 
            this._dialogService.open(CarDialogComponent, { data: { car: this.selectedCar }})
          }
        },
        {
          label: 'Delete', 
          icon: 'pi pi-fw pi-trash',
          command: (_) => {
            this._confirmService.confirm({
              key: 'default',
              message: "Delete car?", 
            accept: () => {
              if(this.selectedCar) this._serviceCar.delete(this.selectedCar.id)
            }})
          }
        }
        
      ];
    }
    onLimitChanged({ value }: any){
      console.log(this.cars)
      this._carFilterService.setLimit(value)
    }
    onColumnsChanged({ value }: any){
      this.selectedColumns = value
      this.limit = value * 5
      this._carFilterService.setLimit(this.limit)
    }

    onSelect(event: any, car: CarInfo){
      console.log(this.cars)
      event.stopPropagation()
      this.cm?.show(event)
      this.selectedCar = car
    }
  }
  