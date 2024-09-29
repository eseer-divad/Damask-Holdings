import { TestBed } from '@angular/core/testing';

import { GetPunchesService } from './get-punches.service';

describe('GetPunchesService', () => {
  let service: GetPunchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPunchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
