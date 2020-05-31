import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListManagementComponent } from './order-list-management.component';

describe('OrderListManagementComponent', () => {
  let component: OrderListManagementComponent;
  let fixture: ComponentFixture<OrderListManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
