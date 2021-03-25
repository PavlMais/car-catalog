import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { BrandService } from 'src/app/core/services/brand.service';
import { map } from 'rxjs/operators';
import { Brand, Model } from 'src/app/core/models';
import { ModelService } from 'src/app/core/services/model.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';

interface NodeData {
  brand: Brand
  model?: Model
}
@Component({
  selector: 'app-models-tree',
  templateUrl: './models-tree.component.html',
  styleUrls: ['./models-tree.component.scss'],
})
export class ModelsTreeComponent implements OnInit {

  selectedNode: TreeNode<NodeData> | undefined;

  models: TreeNode<NodeData>[] = []

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
      { label: 'Add brand', icon: 'pi pi-plus', command: () => this._dialogService.openDialog(BrandDialogComponent.name)},
      { 
        label: 'Add model', icon: 'pi pi-plus', 
        command: (event) => { 
          console.log("Event: ", this.selectedNode)
          this._dialogService.openDialog(ModelDialogComponent.name, this.selectedNode?.data?.brand)
        }
      },
      { 
        label: 'Edit', icon: 'pi pi-pencil', command: (event) => {
          if(!this.selectedNode || !this.selectedNode.data) return 

          let { brand, model } = this.selectedNode.data
          
          if(this.selectedNode?.data?.model){
            this._dialogService.openDialog(ModelDialogComponent.name, brand, model, true)
          }else{
            this._dialogService.openDialog(BrandDialogComponent.name, brand, true)
          }

       } 
      },
      { label: 'Delete', icon: 'pi pi-trash', command: (event) => { 
        this._dialogService.openDialog(ConfirmDialogComponent.name, "Delete brand?")
      } }
    ];

  }
  nodeSelect(event: any) {
    this.selected.emit();
    console.log("sel: ", this.selectedNode)
  }

  loadNode({ node }: NodeExpandEvent<NodeData>) {
    if (node && node.data) {
      this._modelService.getAll({ brandId: node.data.brand.id })
                        .pipe(this.modelsToNodes(node.data.brand))
                        .subscribe(nodes => node.children = nodes);

    }
  }

  brandsToTreeNodes(brands: any[], leaf: boolean) {
    return brands.map(brand => ({ label: brand.name, leaf, data: { brand } }))
  }
  modelsToNodes(brand: Brand){
    return map<Model[], any>(models => models.map(model => ({
      label: model.name,
      leaf: true,
      data: {model, brand}
    })))
  }
}

interface NodeExpandEvent<TData> {
  node?: TreeNode<TData>
}
