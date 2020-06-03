import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignRequiredManagementComponent } from './design-required-management.component';

describe('DesignRequiredManagementComponent', () => {
  let component: DesignRequiredManagementComponent;
  let fixture: ComponentFixture<DesignRequiredManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignRequiredManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignRequiredManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
