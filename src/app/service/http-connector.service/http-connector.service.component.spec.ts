import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpConnector.ServiceComponent } from './http-connector.service.component';

describe('HttpConnector.ServiceComponent', () => {
  let component: HttpConnector.ServiceComponent;
  let fixture: ComponentFixture<HttpConnector.ServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpConnector.ServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpConnector.ServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
