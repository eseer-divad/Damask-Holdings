import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNavbarComponent } from './hr-navbar.component';

describe('HrNavbarComponent', () => {
  let component: HrNavbarComponent;
  let fixture: ComponentFixture<HrNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrNavbarComponent]
    });
    fixture = TestBed.createComponent(HrNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
