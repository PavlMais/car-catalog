import { Component, OnInit } from '@angular/core';
import { Dialog } from 'src/app/core/models/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export abstract class BaseDialogComponent implements OnInit, Dialog {

  display = false

  constructor(_dialogService: DialogService) { 
    _dialogService.registerDialog(this)
  }

  openDialog(...args: any): void {
    this.display = true
    this.onOpen && this.onOpen(...args)
  }  
  onOpen?(...args: any): void 

  ngOnInit(): void {
  }

}
