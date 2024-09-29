import { TestBed } from '@angular/core/testing';

import { approvePTORequest } from './approve-pto-request.service';

describe('ViewAllRequestsService', () => {
  let service: approvePTORequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(approvePTORequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
