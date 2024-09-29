import { TestBed } from '@angular/core/testing';

import { ViewRequestsService } from './view-requests.service';

describe('ViewRequestsService', () => {
  let service: ViewRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
