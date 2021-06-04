import { TestBed } from '@angular/core/testing';

import { CharacterDisplayService } from './character-display.service';

describe('CharacterDisplayService', () => {
  let service: CharacterDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
