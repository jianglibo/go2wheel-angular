import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerCreateComponent } from './manufacturer-create/manufacturer-create.component';
import { ManufacturerEditComponent } from './manufacturer-edit/manufacturer-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageSelectorModule, NameValueModule, ActionMenuModule } from 'jlbfields';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ImageSelectorModule,
    MatFormFieldModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    NameValueModule,
    MatInputModule,
    MatButtonModule,
    ActionMenuModule,
    ManufacturerRoutingModule
  ],
  declarations: [
    ManufacturerDetailComponent,
    ManufacturerListComponent,
    ManufacturerCreateComponent,
    ManufacturerEditComponent,
  ],
  providers: [ ManufacturerService ],
  exports: [ManufacturerDetailComponent,
    ManufacturerListComponent,
  ManufacturerCreateComponent,
  ManufacturerEditComponent ]
})
export class ManufacturerModule { }
