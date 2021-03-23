import { Brand, Color, Model } from 'src/app/core/models';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {
  display = false

  selectedBrand: Brand | undefined
  brands: Brand[] = []

  selectedColor: Color | undefined
  colors: Color[] = []

  selectedModel: Model | undefined
  models: Model[] = []

  price: number | undefined

  engineValue: number | undefined

  description: string = ''


  constructor(_modalService: ModalService) {
    _modalService.registerModal(this)
  }

  ngOnInit(): void {
  }


  openModal(): void {
    this.display = true
  }

}
