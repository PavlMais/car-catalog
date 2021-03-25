import { Component } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends BaseDialogComponent {
  title: string = ''


  constructor(_dialogService: DialogService) {
    super(_dialogService)
  }

  
  onOpen(title: string): void {
    this.title = title
  }
  
  cancel(){

  }
  ok(){

  }

}
