import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStubsComponent } from './pay-stubs.component';

describe('PayStubsComponent', () => {
  let component: PayStubsComponent;
  let fixture: ComponentFixture<PayStubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayStubsComponent]
    });
    fixture = TestBed.createComponent(PayStubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
