import { TestBed } from '@angular/core/testing';

import { TransferStorageService } from './transfer-storage.service';

describe('TransferStorageService', () => {
  let service: TransferStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
