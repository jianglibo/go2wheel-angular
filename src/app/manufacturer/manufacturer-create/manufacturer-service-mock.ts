import { Injectable } from '@angular/core';
import { HttpDatastore } from 'jsonapi4angular';
import { ManufacturerDatasource } from '../manufacturer-datasource';
import { Manufacturer, SingleBody, ManufacturerAttributes } from 'data-shape-ng';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManufacturerServiceMock {
  constructor(private _datastore: HttpDatastore) {}
  getDatasource(): ManufacturerDatasource {
    const mfds = new ManufacturerDatasource(this._datastore);
    mfds.resultsLength = 12;
    return mfds;
  }
  save(
    manufacturer: Manufacturer
  ): Observable<SingleBody<ManufacturerAttributes, Manufacturer>> {
    return null;
  }
}
