import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelInfo, ColorInfo, BrandInfo, CarInfo, CarNew } from '@models';
import { CarService, BrandService, ColorService, ModelService} from '@services'

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent implements OnInit {

  brands: BrandInfo[] = []
  colors: ColorInfo[] = []
  models: ModelInfo[] = []

  carForm = new FormGroup({
    brandId: new FormControl(null, Validators.required),
    colorId: new FormControl(null, Validators.required),
    modelId: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    engineVolume: new FormControl(null, Validators.required)
  })  
  editingCar: CarInfo | {  brand: BrandInfo, model?: ModelInfo } 
 
  isEditing = false
  isLoading = false

  constructor(
    private _modelService: ModelService,
    private _brandService: BrandService,
    private _colorService: ColorService,
    private _carService: CarService, 
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) {
      this.editingCar = config.data.car
    
      this.config.header = this.editingCar ? "Edit car" : "Add car"
  }

  ngOnInit(): void {
    this._colorService.getAll().subscribe(c => this.colors = c)
    this._brandService.getAll().subscribe(b => this.brands = b)
    
    this.carForm.controls.brandId.valueChanges.subscribe(brandId => {
      this._modelService.getAll({brandId}).subscribe(m => this.models = m)
    });

    let { brand, model } = this.editingCar
    
    this.carForm.controls.brandId.setValue(brand?.id);
    this.carForm.controls.modelId.setValue(model?.id);

    if((this.editingCar as CarInfo).id){
      let { color, description, engineVolume, price } = this.editingCar as CarInfo

      this.isEditing = true
      this.carForm.controls.colorId.setValue(color.id)
      
      this.carForm.controls.description.setValue(description)
      this.carForm.controls.engineVolume.setValue(engineVolume)
      this.carForm.controls.price.setValue(price)
    } 
  }
  
  saveCar(){
    this.carForm.markAllAsTouched()
    if(this.carForm.invalid) return;
    this.isLoading = true



    let newCar = this.carForm.value as CarNew
    let result
    if(this.isEditing){
      result = this._carService.update((this.editingCar as CarInfo).id, newCar)
    }else{
      result = this._carService.create(newCar)
    }

    result.subscribe(_ => this.ref.close())

  }
}
