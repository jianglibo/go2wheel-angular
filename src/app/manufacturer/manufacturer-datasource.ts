import { HttpDatastoreService } from '../services/http-datastore.service';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ManufacturerAttributes, Manufacturer, DataStore } from 'data-shape-ng';
import { CommonDataSource } from 'jsonapi4angular';

export class ManufacturerDatasource extends CommonDataSource<ManufacturerAttributes, Manufacturer> {

    constructor(_dataStore: DataStore) {
            super(_dataStore, Manufacturer);
    }
}
