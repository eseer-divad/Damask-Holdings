import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchSearchComponent } from './punch-search.component';

describe('PunchSearchComponent', () => {
  let component: PunchSearchComponent;
  let fixture: ComponentFixture<PunchSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PunchSearchComponent]
    });
    fixture = TestBed.createComponent(PunchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
