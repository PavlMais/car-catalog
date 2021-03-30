import { BrandInfo } from './../../core/models';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModelService, BrandService } from 'src/app/core/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


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
    if(!this.selectedBrand) return

    if(this.isEditing && this.modelId){
      this._modelService.update(this.modelId, {brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }else{
      this._modelService.create({brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }
    this.ref.close()
  }
}
