import { Injectable, Inject } from '@angular/core';
import { ManufacturerDatasource } from './manufacturer-datasource';
import { Observable } from 'rxjs/Observable';
import { Manufacturer, SingleBody, ManufacturerAttributes } from 'data-shape-ng';
import { HttpDatastore } from 'jsonapi4angular';

@Injectable()
export class ManufacturerService {

  constructor(@Inject(HttpDatastore) private _datastore: HttpDatastore) {
  }

   getDatasource(): ManufacturerDatasource {
     return new ManufacturerDatasource(this._datastore);
   }

   save(manufacturer: Manufacturer): Observable<SingleBody<ManufacturerAttributes, Manufacturer>> {
     if (manufacturer.id) {
      return this._datastore.saveRecord(manufacturer);
     } else {
       return this._datastore.createRecord(Manufacturer, manufacturer);
     }
   }
}
