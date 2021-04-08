import { Component, OnInit, Type } from '@angular/core';
import { map } from 'rxjs/operators';
import { MenuItem, TreeNode } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BrandInfo, ModelInfo } from '@models';
import { BrandDialogComponent } from '../brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from '../model-dialog/model-dialog.component';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { CarFiltersService, BrandService, ModelService } from '@services';

interface NodeData {
  brand?: BrandInfo
  model?: ModelInfo
  def: boolean 
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

  selectedNode: TreeNode<NodeData> | undefined
  models: TreeNode<NodeData>[] = []

  items: MenuItem[] = []
  menuItems: MenuItem[] = []

  constructor(
    private _brandService: BrandService,
    private _modelService: ModelService,
    private _dialogService: DialogService,
    private _confirmService: ConfirmationService,
    private _carFiltersService: CarFiltersService) { }

  update(){
    this.models = []
    let allBrands = { label: "All brands", data: { brand: undefined, model: undefined,  def: true}}

    this.models.push(allBrands)
    this.selectedNode = allBrands
    this._brandService.getAll().pipe(map(d => this.brandsToNodes(d, false)))
      .subscribe(data => this.models.push(...data));

    this._carFiltersService.update()
  }

  createMenuItem(label: string, icon: string, onOpen: Function){
    return {
      label,
      icon: `pi ${icon}`,
      command: () => {
        let conf = onOpen()
        this._dialogService.open(conf.type, { data: conf.data }).onClose.subscribe(() => this.update())
      }
    }
  }

  ngOnInit(): void {
    this.update()

    this.menuItems = [
      this.createMenuItem('Add brand', 'pi-plus', () => ({ type: BrandDialogComponent })),
      this.createMenuItem('Add model', 'pi-plus', () => ({ type: ModelDialogComponent })),
      this.createMenuItem('Add car', 'pi-plus', () => ({ type:  CarDialogComponent }))
    ]

    this.items = [
      this.createMenuItem('Add brand', 'pi-plus', () => ({ type: BrandDialogComponent })),
      this.createMenuItem('Add model', 'pi-plus', 
        () => ({ type: ModelDialogComponent, data: {brand: this.selectedNode?.data?.brand }})),

      this.createMenuItem('Add car', 'pi-plus', 
        () => ({ type: CarDialogComponent, data: { car: this.selectedNode?.data }})
      ),
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editItem()
      },
      { 
        label: 'Delete',
        icon: 'pi pi-trash', 
        command: () => this.deleteItem()
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
    return brands.map(brand => ({ label: brand.name, leaf, data: { brand, def: false } }))
  }
  modelsToNodes(brand: BrandInfo){
    return map<ModelInfo[], any>(models => models.map(model => ({
      label: model.name,
      leaf: true,
      data: {model, brand, def: false}
    })))
  }

  editItem(){
    if(!this.selectedNode?.data) return 
    let modalType;

    if(!!this.selectedNode?.data?.model){
      modalType = ModelDialogComponent
    } else {
      modalType = BrandDialogComponent
    }

    this._dialogService.open(modalType, { data: this.selectedNode.data }).onClose.subscribe(() => this.update())
  }

  deleteItem(){
    if(!this.selectedNode?.data) return
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


