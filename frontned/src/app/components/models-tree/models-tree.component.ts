import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { BrandService } from 'src/app/core/services/brand.service';
import { CarService } from 'src/app/core/services/car.service';
import { map } from 'rxjs/operators';
import { Brand } from 'src/app/core/models';
import { ModelService } from 'src/app/core/services/model.service';
import { HttpParams } from '@angular/common/http';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-models-tree',
  templateUrl: './models-tree.component.html',
  styleUrls: ['./models-tree.component.scss'],
})
export class ModelsTreeComponent implements OnInit {

  selectedFile: TreeNode | undefined;

  models: TreeNode[] = []

  items: MenuItem[] = [];

  @Output() selected = new EventEmitter();

  constructor(
    private _serviceBrand: BrandService,
    private _serviceModel: ModelService,
    private _serviceModal: ModalService) { }

  ngOnInit(): void {
    this._serviceBrand.getAll().pipe(map(d => this.brandsToTreeNodes(d, false)))
      .subscribe(data => this.models = data);

    this.items = [
      { label: 'Add brand', icon: 'pi pi-plus', command: (event) => { 
        this._serviceModal.openModal(ModalComponent.name)
      } },
      { label: 'Edit', icon: 'pi pi-pencil', command: (event) => { } },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => { 
        this._serviceModal.openModal(ConfirmModalComponent.name, "Delete brand?")
      } }
    ];

  }
  nodeSelect(event: any) {
    this.selected.emit();
  }

  loadNode(event: any) {
    if (event.node) {
      

      this._serviceModel.getAll(new HttpParams().set('brandId', event.node.data))
                        .pipe(map(d => this.brandsToTreeNodes(d, true)))
                        .subscribe(nodes => {
        event.node.children = nodes
      });
    }
  }

  brandsToTreeNodes(brands: any[], leaf: boolean) {
    return brands.map(b => ({ label: b.name, leaf, data: b.id }))
  }

}
