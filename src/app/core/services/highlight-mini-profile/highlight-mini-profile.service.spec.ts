import { TestBed } from '@angular/core/testing';

import { HighlightMiniProfileService } from './highlight-mini-profile.service';

describe('UnhighlightMiniProfileService', () => {
  let service: HighlightMiniProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightMiniProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
