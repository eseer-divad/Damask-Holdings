import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPtoComponent } from './e-pto.component';

describe('EPtoComponent', () => {
  let component: EPtoComponent;
  let fixture: ComponentFixture<EPtoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EPtoComponent]
    });
    fixture = TestBed.createComponent(EPtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
