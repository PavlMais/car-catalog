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
import { HttpClientModule } from '@angular/common/http';
import { ContextMenuModule } from 'primeng/contextmenu';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ModelsListComponent } from './components/models-list/models-list.component';
import { DataViewModule } from 'primeng/dataview';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModelsTreeComponent,
    ModelsListComponent
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
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
