import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { BrandService } from 'src/app/core/services/brand.service';
import { CarService } from 'src/app/core/services/car.service';
import { map } from 'rxjs/operators';
import { Brand } from 'src/app/core/models';
import { ModelService } from 'src/app/core/services/model.service';
import { HttpParams } from '@angular/common/http';
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
    private _serviceModel: ModelService) { }

  ngOnInit(): void {
    this._serviceBrand.getAll().pipe(map(d => this.brandsToTreeNodes(d, false)))
      .subscribe(data => this.models = data);

    this.items = [
      { label: 'Add', icon: 'pi pi-plus', command: (event) => { } },
      { label: 'Edit', icon: 'pi pi-pencil', command: (event) => { } },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => { } }
    ];

  }
  nodeSelect(event: any) {
    this.selected.emit();
  }

  loadNode(event: any) {
    if (event.node) {
      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      console.log("NODE: ", event.node)


      this._serviceModel.getAll(new HttpParams().set('brandId', event.node.data)).pipe(map(d => this.brandsToTreeNodes(d, true))).subscribe(nodes => {
        event.node.children = nodes
      });
    }
  }

  brandsToTreeNodes(brands: any[], leaf: boolean) {
    return brands.map(b => ({ label: b.name, leaf, data: b.id }))
  }

}
