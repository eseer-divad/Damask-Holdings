import { TestBed } from '@angular/core/testing';

import { LoginSService } from './login-s.service';

describe('LoginSService', () => {
  let service: LoginSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
