import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/core/models';
import { ModelService } from 'src/app/core/services/model.service';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
})
export class ModelsListComponent implements OnInit {


  cars: Model[] = []


  constructor(private _serviceModel: ModelService) { }

  ngOnInit(): void {
    this._serviceModel.getAll().subscribe(m => this.cars = m)
  }

}
