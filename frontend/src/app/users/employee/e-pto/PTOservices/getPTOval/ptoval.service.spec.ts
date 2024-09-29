import { TestBed } from '@angular/core/testing';

import { PTOvalService } from './ptoval.service';

describe('PTOvalService', () => {
  let service: PTOvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PTOvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
