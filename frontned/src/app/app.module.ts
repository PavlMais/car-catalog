import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms' 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api'
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';



import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModelsTreeComponent } from './components/models-tree/models-tree.component';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { CarsFiltersComponent } from './components/cars-filters/cars-filters.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { BrandDialogComponent } from './components/brand-dialog/brand-dialog.component';
import { ModelDialogComponent } from './components/model-dialog/model-dialog.component';
import { CarPageComponent } from './components/car-page/car-page.component';
import { HeaderInterceptor as HeaderInterceptor } from './core/interceptors/header-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModelsTreeComponent,
    ModelsListComponent,
    CarsFiltersComponent,
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
    MenuModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    ContextMenuModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    DataViewModule,
    DropdownModule,
    InputNumberModule,
    PaginatorModule,
    CalendarModule,
    InputTextModule,
    ChartModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }



