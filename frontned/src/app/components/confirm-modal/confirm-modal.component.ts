import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/core/models/modal';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, Modal {
  display: boolean = false;
  title: string = ''


  constructor(_modalService: ModalService) {
    _modalService.registerModal(this)
  }

  openModal(title: string): void {
    this.display = true
    this.title = title
  }

  ngOnInit(): void {
  }
  cancel(){

  }
  ok(){

  }

}
