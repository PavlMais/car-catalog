import { SharedModule } from './common/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModelsTreeComponent } from './components/models-tree/models-tree.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContextMenuModule } from 'primeng/contextmenu';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { DataViewModule } from 'primeng/dataview';
import { CarsFiltersComponent } from './components/cars-filters/cars-filters.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CarItemComponent } from './components/car-item/car-item.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { BrandDialogComponent } from './components/brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from './components/model-dialog/model-dialog.component';
import { HeaderInterceptor as HeaderInterceptor } from './core/interceptors/header-interceptor.service';
import { CarPageComponent } from './components/car-page/car-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModelsTreeComponent,
    ModelsListComponent,
    CarsFiltersComponent,
    ConfirmDialogComponent,
    CarItemComponent,
    CarDialogComponent,
    BrandDialogComponent,
    ModelDialogComponent,
    CarPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    TreeModule,
    CoreModule,
    HttpClientModule,
    DialogModule,
    SharedModule,
    ContextMenuModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    DataViewModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
