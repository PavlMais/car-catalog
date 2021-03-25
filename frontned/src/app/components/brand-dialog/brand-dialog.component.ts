import { DialogService as DialogService } from 'src/app/core/services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent as BaseDialogComponent } from '../base-dialog/base-dialog.component';
import { BrandService } from 'src/app/core/services/brand.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent extends BaseDialogComponent {
  nameControl = new FormControl('', Validators.required);

  constructor(private _brandService: BrandService,
    _dialogService: DialogService) {
    super(_dialogService)
  }
  

  addBrand(){
    this._brandService.create({name: this.nameControl.value})
    this.display = false
  }
}
