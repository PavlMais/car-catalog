import { DialogService as DialogService } from 'src/app/core/services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent as BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { BrandService } from 'src/app/core/services/brand.service';
import { FormControl, Validators } from '@angular/forms';
import { Brand } from '../../core/models'
@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent extends BaseDialogComponent {
  brandId: number | undefined
  nameControl = new FormControl('', Validators.required);
  header = "Add brand"
  isEditing = false

  constructor(private _brandService: BrandService,
    _dialogService: DialogService) {
    super(_dialogService)
  }

  onOpen(brand?: Brand, isEditing = false){
    this.isEditing = isEditing
    if(isEditing && brand){
      this.brandId = brand.id
      this.nameControl.setValue(brand.name)
      this.header = "Edit brand"
    }
  }
  

  saveBrand(){
    console.log("Test: ", this.isEditing, this.brandId)
    if(this.isEditing && this.brandId){
      this._brandService.update(this.brandId, {name: this.nameControl.value}).subscribe(() => {})
    }else{
      this._brandService.create({name: this.nameControl.value}).subscribe(() => {})
    }
    this.display = false
  }
}
