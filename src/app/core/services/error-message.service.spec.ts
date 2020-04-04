import { TestBed } from '@angular/core/testing';

import { ErrorMessageService } from './error-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ErrorMessageService', () => {
  let service: ErrorMessageService;

  class MockMatSnackBar {
    open(mess: string, act: string): void {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: MatSnackBar, useClass:MockMatSnackBar}
      ]
    });
    service = TestBed.inject(ErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
