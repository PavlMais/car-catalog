import { Injectable } from '@angular/core';
import { Modal } from '../models/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals: Record<string, Modal> = {}

  constructor() { }

  registerModal(modal: Modal){
    this.modals[modal.constructor.name] = modal
    console.log("register")
    console.log(this.modals)
  }

  openModal(name: string, ...args: any){
    this.modals[name].openModal(...args)
  }
}
