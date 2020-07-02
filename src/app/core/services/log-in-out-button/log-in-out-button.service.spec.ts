import { TestBed } from '@angular/core/testing';

import { LogInOutButtonService } from './log-in-out-button.service';

describe('LogInOutButtonService', () => {
  let service: LogInOutButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInOutButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
