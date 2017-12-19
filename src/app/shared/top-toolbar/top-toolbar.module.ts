import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { TopToolbarComponent } from './top-toolbar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [ TopToolbarComponent ],
  exports: [ TopToolbarComponent ]
})
export class TopToolbarModule { }
