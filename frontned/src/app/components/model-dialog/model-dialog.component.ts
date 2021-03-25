import { Brand, Model } from './../../core/models';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModelService } from 'src/app/core/services/model.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.scss']
})
export class ModelDialogComponent extends BaseDialogComponent implements OnInit {
  modelId: number | undefined

  nameControl = new FormControl('', Validators.required);
  header = 'Create model'
  
  brands: Brand[] = []
  selectedBrand: Brand | undefined
  
  isEditing = false


  constructor(
    private _modelService: ModelService,
    private _brandService: BrandService,
    _dialogService: DialogService) {
    super(_dialogService)
  }
  ngOnInit(){
    this._brandService.getAll().subscribe(b => this.brands = b);
    
  }
  onOpen(brand?: Brand, model?: Model, isEditing = false){
    this.selectedBrand = brand
    this.isEditing = isEditing
    if(isEditing && model && brand){
      this.nameControl.setValue(model.name)
      this.header = "Edit model"
      this.modelId = model.id
    }
  }

  saveBrand(){
    if(!this.selectedBrand) return

    if(this.isEditing && this.modelId){
      this._modelService.update(this.modelId, {brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }else{
      this._modelService.create({brandId: this.selectedBrand.id!, name: this.nameControl.value})
    }
    this.display = false
  }
}
