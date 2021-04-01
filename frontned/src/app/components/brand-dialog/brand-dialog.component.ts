import { Component } from '@angular/core';
import { BrandService } from 'src/app/core/services';
import { FormControl, Validators } from '@angular/forms';
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
  isLoading = false

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
    if(!this.nameControl.valid) {
      this.nameControl.markAllAsTouched()
      return  
    }
    this.isLoading = true
    let result;
    if(this.isEditing && this.brandId){
      result = this._brandService.update(this.brandId, {name: this.nameControl.value})
    }else{
      result = this._brandService.create({name: this.nameControl.value})
    }

    result.subscribe(_ => this.ref.close())
  }
}
