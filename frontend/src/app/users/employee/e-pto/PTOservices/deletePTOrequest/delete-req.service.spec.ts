import { TestBed } from '@angular/core/testing';

import { DeleteReqService } from './delete-req.service';

describe('DeleteReqService', () => {
  let service: DeleteReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
