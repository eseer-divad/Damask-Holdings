import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtoReviewComponent } from './pto-review.component';

describe('PtoReviewComponent', () => {
  let component: PtoReviewComponent;
  let fixture: ComponentFixture<PtoReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PtoReviewComponent]
    });
    fixture = TestBed.createComponent(PtoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
