import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModelService, BrandService } from '@services';
import { BrandInfo } from '@models';


@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss']
})
export class ModelDialogComponent {
  modelId: number | undefined

  nameControl = new FormControl('', Validators.required);
  header = 'Create model'
  
  brands: BrandInfo[] = []
  selectedBrand: BrandInfo | undefined
  
  isEditing = false
  isLoading = false

  constructor(
    private _modelService: ModelService,
    private _brandService: BrandService,
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig) {

      this.config.header = "Add model"

      let {brand, model} = config.data

      this.selectedBrand = brand
      this.isEditing = !!brand && !!model

      if(this.isEditing){
        this.nameControl.setValue(model.name)
        this.config.header = "Edit model"
        this.modelId = model.id
      }

  }
  ngOnInit(){
    this._brandService.getAll().subscribe(b => this.brands = b);
  }

  saveBrand(){
    if(!this.nameControl.valid || !this.selectedBrand) {
      this.nameControl.markAllAsTouched()
      return  
    }
    this.isLoading = true

    let result;
    if(this.isEditing && this.modelId){
      result = this._modelService.update(this.modelId, {brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }else{
      result = this._modelService.create({brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }
    
    result.subscribe(_ => this.ref.close())
  }
}
