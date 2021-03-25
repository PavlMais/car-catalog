import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { BrandService } from 'src/app/core/services/brand.service';
import { CarService } from 'src/app/core/services/car.service';
import { map } from 'rxjs/operators';
import { Brand } from 'src/app/core/models';
import { ModelService } from 'src/app/core/services/model.service';
import { HttpParams } from '@angular/common/http';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
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
    private _brandService: BrandService,
    private _modelService: ModelService,
    private _dialogService: DialogService) { }

  ngOnInit(): void {
    this._brandService.getAll().pipe(map(d => this.brandsToTreeNodes(d, false)))
      .subscribe(data => this.models = data);

    this.items = [
      { label: 'Add brand', icon: 'pi pi-plus', command: (event) => { 
        this._dialogService.openDialog(BrandDialogComponent.name)
      } },
      { label: 'Edit', icon: 'pi pi-pencil', command: (event) => { } },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => { 
        this._dialogService.openDialog(ConfirmDialogComponent.name, "Delete brand?")
      } }
    ];

  }
  nodeSelect(event: any) {
    this.selected.emit();
  }

  loadNode(event: any) {
    if (event.node) {
      

      this._modelService.getAll(new HttpParams().set('brandId', event.node.data))
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
