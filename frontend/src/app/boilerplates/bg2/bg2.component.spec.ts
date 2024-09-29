import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bg2Component } from './bg2.component';

describe('Bg2Component', () => {
  let component: Bg2Component;
  let fixture: ComponentFixture<Bg2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Bg2Component]
    });
    fixture = TestBed.createComponent(Bg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
