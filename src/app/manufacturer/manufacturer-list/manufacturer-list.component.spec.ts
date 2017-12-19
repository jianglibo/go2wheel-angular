import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerListComponent } from './manufacturer-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatSortModule
} from '@angular/material';

import { HttpDatastoreService } from '../../services/http-datastore.service';
import {
  DatastoreUtil,
  PageOffsetLimit,
  PageCursor,
  PageNumberSize,
  isPageNumberSize,
  isPageOffsetLimit,
  Manufacturer,
  SortPhrase,
  FilterPhrase,
  ListBody,
  ManufacturerAttributes,
  MANUFACTURERS_BODY
} from 'data-shape-ng';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ManufacturerDatasource } from '../manufacturer-datasource';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { By } from '@angular/platform-browser';
import { ManufacturerService } from '../manufacturer.service';
import { Injectable } from '@angular/core';
import { HttpDatastore } from 'jsonapi4angular';

class HttpDatastoreServiceStub {
  findAll(
    jsonapiObjectType: Manufacturer,
    page: PageCursor | PageOffsetLimit | PageNumberSize,
    sort: SortPhrase[],
    filter: FilterPhrase[],
    params?: any
  ): Observable<ListBody<ManufacturerAttributes, Manufacturer>> {
    const lb = MANUFACTURERS_BODY as ListBody<
      ManufacturerAttributes,
      Manufacturer
    >;
    console.log(page);
    if (isPageOffsetLimit(page)) {
      lb.data = lb.data.slice(page.offset, page.limit + page.offset);
    }
    return Observable.of(lb);
  }
}

@Injectable()
class ManufacturerServiceMock {
  constructor(private _datastore: HttpDatastore) {}
  getDatasource(): ManufacturerDatasource {
    const mfds = new ManufacturerDatasource(this._datastore);
    mfds.resultsLength = 12;
    return mfds;
  }
}
const httpDatastoreServiceStub = new HttpDatastoreServiceStub();

describe('ManufacturerListComponent', () => {
  let component: ManufacturerListComponent;
  let fixture: ComponentFixture<ManufacturerListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatIconModule,
          MatListModule,
          MatTableModule,
          MatCheckboxModule,
          MatPaginatorModule,
          MatSortModule,
          BrowserAnimationsModule,
          MatFormFieldModule,
          MatInputModule,
          HttpClientTestingModule
        ],
        providers: [
          { provide: HttpDatastore, useValue: httpDatastoreServiceStub },
          { provide: ManufacturerService, useClass: ManufacturerServiceMock }
        ],
        declarations: [ManufacturerListComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerListComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mat-paginator-range-label'));
    const el = de.nativeElement;
    expect(el.textContent).toMatch(/1\s*\-\s*5.*12/g);
  });

  it(
    'should going to page 2.',
    async(() => {
      // only after detectChanges(), component's onInit() will be called.
      expect(component.dataSource).toBeUndefined();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        // wait for async getQuote
        // expect(component.dataSource).toBeUndefined();
        const de = fixture.debugElement.query(
          By.css('.mat-paginator-range-label')
        );
        const el = de.nativeElement;
        expect(el.textContent).toMatch(/1\s*\-\s*5.*12/g);
      });
    })
  );
});
