import { TestBed } from '@angular/core/testing';

import { ReqPTOService } from './req-pto.service';

describe('ReqPTOService', () => {
  let service: ReqPTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqPTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
