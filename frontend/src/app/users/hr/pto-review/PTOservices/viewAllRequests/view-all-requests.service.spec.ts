import { TestBed } from '@angular/core/testing';

import { ViewAllRequestsService } from './view-all-requests.service';

describe('ViewAllRequestsService', () => {
  let service: ViewAllRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAllRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
