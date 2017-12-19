import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { TopToolbarModule } from './shared/top-toolbar/top-toolbar.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DatastoreUtil} from 'data-shape-ng';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { Jsonapi4angularModule } from 'jsonapi4angular';
import { HttpDatastore } from 'jsonapi4angular';
import { HttpDatastoreService } from './services/http-datastore.service';
import { ManufacturerModule } from './manufacturer/manufacturer.module';

// An NgModule is a class adorned with the @NgModule decorator function
// Put AppRoutingModule at the end of imports!!!!!!!!
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TopToolbarModule,
    FormsModule,
    ManufacturerModule,
    AppRoutingModule
  ],
  declarations: [ PageNotFoundComponent, AppComponent ],
  providers: [
    {provide: HttpDatastore, useClass: HttpDatastoreService}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
