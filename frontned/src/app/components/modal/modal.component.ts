import { BrandService } from 'src/app/core/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Modal } from 'src/app/core/models/modal';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, Modal {
  display: boolean = false;
  nameControl = new FormControl('', Validators.required);
  isCheked = true

  constructor(private _brandService: BrandService, _modalService: ModalService) {
    _modalService.registerModal(this)
  }

  ngOnInit(): void {
    this.nameControl.statusChanges.subscribe((s) => console.log(s));
  }

  openModal() {
      this.display = true;
  }
  addBrand(){
    this._brandService.create({id: 0, name: this.nameControl.value})
    this.display = false
  }

}
