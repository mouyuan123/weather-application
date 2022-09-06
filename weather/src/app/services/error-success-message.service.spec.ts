import { TestBed } from '@angular/core/testing';

import { ErrorSuccessMessageService } from './error-success-message.service';

describe('ErrorSuccessMessageService', () => {
  let service: ErrorSuccessMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorSuccessMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
