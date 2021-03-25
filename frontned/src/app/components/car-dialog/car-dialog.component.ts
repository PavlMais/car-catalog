import { Brand, Color, Model } from 'src/app/core/models';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent extends BaseDialogComponent {
  selectedBrand: Brand | undefined
  brands: Brand[] = []

  selectedColor: Color | undefined
  colors: Color[] = []

  selectedModel: Model | undefined
  models: Model[] = []

  price: number | undefined

  engineValue: number | undefined

  description: string = ''


  constructor(_dialogService: DialogService) {
    super(_dialogService)
  }

}
