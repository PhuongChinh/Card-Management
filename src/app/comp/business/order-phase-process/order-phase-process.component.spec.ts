import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPhaseProcessComponent } from './order-phase-process.component';

describe('OrderPhaseProcessComponent', () => {
  let component: OrderPhaseProcessComponent;
  let fixture: ComponentFixture<OrderPhaseProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPhaseProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPhaseProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
