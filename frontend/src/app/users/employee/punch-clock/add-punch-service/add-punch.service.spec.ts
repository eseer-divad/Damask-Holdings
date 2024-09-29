import { TestBed } from '@angular/core/testing';

import { AddPunchService } from './add-punch.service';

describe('AddPunchService', () => {
  let service: AddPunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
