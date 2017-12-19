import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';
import {RouterTestingModule} from '@angular/router/testing';
import { TopToolbarComponent } from './shared/top-toolbar/top-toolbar.component';
import { TopToolbarModule } from './shared/top-toolbar/top-toolbar.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TopToolbarModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
