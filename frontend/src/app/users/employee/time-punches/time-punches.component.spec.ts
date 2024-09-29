import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePunchesComponent } from './time-punches.component';

describe('TimePunchesComponent', () => {
  let component: TimePunchesComponent;
  let fixture: ComponentFixture<TimePunchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimePunchesComponent]
    });
    fixture = TestBed.createComponent(TimePunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
