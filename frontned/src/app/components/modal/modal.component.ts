import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  display: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showDialog() {
      this.display = true;
  }

}
