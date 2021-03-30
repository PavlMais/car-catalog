import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/core/services';
import { FormControl, Validators } from '@angular/forms';
import { BrandInfo } from '../../core/models'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent {
  brandId: number | undefined
  nameControl = new FormControl('', Validators.required);
  isEditing = false

  constructor(private _brandService: BrandService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    let brand = this.config.data?.brand
    this.config.header = "Add brand"

    if(!!brand){
      this.isEditing = true
      this.brandId = brand.id
      this.nameControl.setValue(brand.name)
      this.config.header = "Edit brand"
    }
  }
  

  saveBrand(){
    if(this.isEditing && this.brandId){
      this._brandService.update(this.brandId, {name: this.nameControl.value})
    }else{
      this._brandService.create({name: this.nameControl.value})
    }
    this.ref.close()
  }
}