import { Injectable } from '@angular/core';
import { Dialog } from '../models/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogs: Record<string, Dialog> = {}

  constructor() { }

  registerDialog(dialog: Dialog){
    this.dialogs[dialog.constructor.name] = dialog
  }

  openDialog(name: string, ...args: any){
    this.dialogs[name].openDialog(...args)
  }
}
