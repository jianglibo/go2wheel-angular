import { Injectable, Inject } from '@angular/core';
import { DataStore } from 'data-shape-ng';
import { HttpClient } from '@angular/common/http';
import { HttpDatastore } from 'jsonapi4angular';

@Injectable()
export class HttpDatastoreService extends HttpDatastore {

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, '/jsonapi', undefined);
  }

}
