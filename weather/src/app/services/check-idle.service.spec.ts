import { TestBed } from '@angular/core/testing';

import { CheckIdleService } from './check-idle.service';

describe('CheckIdleService', () => {
  let service: CheckIdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
