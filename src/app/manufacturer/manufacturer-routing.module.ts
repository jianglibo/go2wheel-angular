import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';
import { ManufacturerCreateComponent } from './manufacturer-create/manufacturer-create.component';
import { ManufacturerEditComponent } from './manufacturer-edit/manufacturer-edit.component';

const manufacturerRoutes: Routes = [
  { path: 'manufacturers',  component: ManufacturerListComponent },
  { path: 'manufacturers/create', component: ManufacturerCreateComponent },
  { path: 'manufacturers/display/:id', component: ManufacturerDetailComponent },
  { path: 'manufacturers/edit/:id', component: ManufacturerCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(manufacturerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManufacturerRoutingModule { }
