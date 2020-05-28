import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachUserWorkingManagementComponent } from './each-user-working-management.component';

describe('EachUserWorkingManagementComponent', () => {
  let component: EachUserWorkingManagementComponent;
  let fixture: ComponentFixture<EachUserWorkingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachUserWorkingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachUserWorkingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
