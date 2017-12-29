import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManufacturerCreateComponent } from './manufacturer-create.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatOptionModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSortModule,
  MatButtonModule,
  MatChipsModule
} from '@angular/material';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { Component, ViewChild, Injectable, DebugElement } from '@angular/core';
import {
  PageCursor,
  PageNumberSize,
  PageOffsetLimit,
  isPageOffsetLimit,
  Manufacturer,
  SortPhrase,
  FilterPhrase,
  ListBody,
  ManufacturerAttributes,
  MANUFACTURERS_BODY,
  SingleBody,
  MANUFACTURER_BODY
} from 'data-shape-ng';
import { Observable } from 'rxjs/Observable';
import { ManufacturerDatasource } from '../manufacturer-datasource';
import { ManufacturerService } from '../manufacturer.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpDatastore } from 'jsonapi4angular';
import { FuComponent } from 'jlbfields';
import { FuIndicatorComponent } from 'jlbfields';
import { ImageSelectorComponent } from 'jlbfields';
import { NameValueComponent, UploadServiceMock } from 'jlbfields';
import { UploadService } from 'jlbfields/upload.service';
import { ManufacturerServiceMock } from './manufacturer-service-mock';
import { ActivatedRouteStub } from '../../test/activated-route-stub';

const URL_IN_FIXTURE =
  'http://localhost:80/uploaded/e42413a752f64421b614102a9f0f1f71.js';

class HttpDatastoreServiceStub {
  findRecord(jsonapiObjectType: Manufacturer): Observable<SingleBody<ManufacturerAttributes, Manufacturer>> {
    const c = MANUFACTURER_BODY as SingleBody<
    ManufacturerAttributes,
    Manufacturer>;
    return Observable.of(c);
  }
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


const httpDatastoreServiceStub = new HttpDatastoreServiceStub();

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-host-component',
  template: `<div><app-manufacturer-create></app-manufacturer-create></div>`
})
class TestHostComponent {
  @ViewChild(
    ManufacturerCreateComponent
  ) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  public testComponent: ManufacturerCreateComponent;
  // public manufacturer: Manufacturer; /* this is the variable which is passed as input to the TestComponent */
}

const ar = new ActivatedRouteStub();

fdescribe('ManufacturerCreateComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MatIconModule,
          MatListModule,
          MatTableModule,
          MatCheckboxModule,
          BrowserAnimationsModule,
          MatPaginatorModule,
          MatSortModule,
          MatFormFieldModule,
          MatInputModule,
          MatOptionModule,
          MatSelectModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatChipsModule,
          MatProgressBarModule
        ],
        declarations: [
          TestHostComponent,
          ManufacturerCreateComponent,
          FuComponent,
          FuIndicatorComponent,
          ImageSelectorComponent,
          NameValueComponent
        ],
        providers: [
          { provide: HttpDatastore, useValue: httpDatastoreServiceStub },
          { provide: ManufacturerService, useClass: ManufacturerServiceMock }
          ,
          { provide: ActivatedRoute, useValue: ar },
          { provide: UploadService, useClass: UploadServiceMock }
        ]
      }).compileComponents();
    })
  );

  it(
    'should initialize value.',
    fakeAsync(() => {
      ar.testParamMap = {id: 123};
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;

      let dls: DebugElement[];
      // tslint:disable-next-line:prefer-const
      let dl: DebugElement;

      const fc: ManufacturerCreateComponent = component.testComponent;
      // component.manufacturer = MANUFACTURER_BODY.data;
      fixture.detectChanges();
      tick();

      dls = fixture.debugElement.queryAll(By.css('.nvpair-container'));
      expect(dls.length).toEqual(2);
    })
  );

  // it(
  //   'should submit form.',
  //   fakeAsync(() => {
  //     fixture = TestBed.createComponent(TestHostComponent);
  //     component = fixture.componentInstance;
  //     let dls: DebugElement[];
  //     let dl: DebugElement;

  //     const mService = fixture.debugElement.injector.get(ManufacturerService);

  //     const lb = MANUFACTURER_BODY as SingleBody<
  //       ManufacturerAttributes,
  //       Manufacturer
  //     >;
  //     const singleResponse = Observable.of(lb);
  //     // Setup spy on the `getQuote` method
  //     const spy = spyOn(mService, 'save').and.returnValue(singleResponse);

  //     dls = fixture.debugElement.queryAll(By.css('button[type=submit]'));
  //     expect(dls.length).toBe(1);

  //     dl = fixture.debugElement.query(By.css('button[type=submit]'));
  //     expect(dl).toBeTruthy();
  //     // component.manufacturer = MANUFACTURER_BODY.data;
  //     fixture.detectChanges();
  //     component.testComponent.onSubmit();
  //     expect(spy.calls.count()).toBe(1, 'method should be called once.');
  //     const p1 = spy.calls.argsFor(0);
  //   })
  // );
});
