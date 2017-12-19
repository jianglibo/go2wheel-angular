import { TestBed, inject } from '@angular/core/testing';
import { HttpDatastoreService } from './http-datastore.service';
import {} from 'jasmine';
import { HttpClient } from '@angular/common/http';


describe('DatastoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpDatastoreService, {provide: HttpClient, useValue: {}}]
    });
  });

  it('should be created', inject([HttpDatastoreService], (service: HttpDatastoreService) => {
    expect(service).toBeTruthy();
  }));
});
