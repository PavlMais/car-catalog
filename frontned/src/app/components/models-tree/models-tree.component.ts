import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuItem, TreeNode } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BrandService, ModelService } from 'src/app/core/services';
import { BrandInfo, ModelInfo } from 'src/app/core/models';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { CarFiltersService } from 'src/app/core/services/car-filters.service';

interface NodeData {
  brand?: BrandInfo
  model?: ModelInfo
}

interface NodeExpandEvent<TData> {
  node?: TreeNode<TData>
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

  constructor(
    private _brandService: BrandService,
    private _modelService: ModelService,
    private _dialogService: DialogService,
    private _confirmService: ConfirmationService,
    private _carFiltersService: CarFiltersService) { }

  update(){
    console.log("update...")
    this.models = []
    let allBrands = { label: "All brands", data: { brand: undefined, model: undefined}}

    this.models.push(allBrands)
    this.selectedNode = allBrands
    this._brandService.getAll().pipe(map(d => this.brandsToNodes(d, false)))
      .subscribe(data => this.models.push(...data));
  }

  ngOnInit(): void {
    this.update()

    this.items = [
      { 
        label: 'Add brand', 
        icon: 'pi pi-plus', 
        command: () => this._dialogService.open(BrandDialogComponent, {}).onClose.subscribe(() => this.update())
      },
      { 
        label: 'Add model', 
        icon: 'pi pi-plus', 
        command: () => { 
          this._dialogService.open(ModelDialogComponent, 
            { data: { brand: this.selectedNode?.data?.brand }}).onClose.subscribe(() => this.update())
        }
      },
      { 
        label: 'Add car', 
        icon: 'pi pi-plus', 
        command: () => { 
          if(!this.selectedNode || !this.selectedNode.data) return 

          let { brand, model } = this.selectedNode.data

          this._dialogService.open(CarDialogComponent, { data: { car: { brand, model } }}).onClose.subscribe(_ => {
            this._carFiltersService.update()
          })
        }
      },
      { 
        label: 'Edit', 
        icon: 'pi pi-pencil', 
        command: () => {
          if(!this.selectedNode || !this.selectedNode.data) return 

          let { brand, model } = this.selectedNode.data
          
          if(!!this.selectedNode?.data?.model){
            this._dialogService.open(ModelDialogComponent, { data: { brand, model }}).onClose.subscribe(() => this.update())
          }else{
            this._dialogService.open(BrandDialogComponent, { data: { brand } }).onClose.subscribe(() => this.update())
          }
       } 
      },
      { 
        label: 'Delete',
        icon: 'pi pi-trash', 
        command: () => { 
          if(!this.selectedNode || !this.selectedNode.data) return
          let { brand, model } = this.selectedNode.data

          if(model) 
            this._confirmService.confirm({ 
              message: `Delete model '${model.name}'?`, 
              accept: () => {
                if(model) this._modelService.delete(model.id).subscribe(_ => this.update())
              }
           })
          else if (brand){
            this._confirmService.confirm({ 
              message: `Delete brand '${brand.name}'?`, 
              accept: () => {
                if(brand) this._brandService.delete(brand.id).subscribe(_ => this.update())
              }
            })
          }
        } 
      }
    ];

  }
  nodeSelect() {
    if(this.selectedNode?.data?.brand) {
      let { brand, model } = this.selectedNode.data
      this._carFiltersService.setBrandAndModel(brand.id, model?.id);
    } else {
      this._carFiltersService.setBrandAndModel();
    }
  }

  loadNode({ node }: NodeExpandEvent<NodeData>) {
    if (node?.data?.brand) {
      this._modelService.getAll({ brandId: node.data.brand.id })
                        .pipe(this.modelsToNodes(node.data.brand))
                        .subscribe(nodes => node.children = nodes);

    }
  }

  brandsToNodes(brands: any[], leaf: boolean) {
    return brands.map(brand => ({ label: brand.name, leaf, data: { brand } }))
  }
  modelsToNodes(brand: BrandInfo){
    return map<ModelInfo[], any>(models => models.map(model => ({
      label: model.name,
      leaf: true,
      data: {model, brand}
    })))
  }
}


