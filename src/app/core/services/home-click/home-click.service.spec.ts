import { TestBed } from '@angular/core/testing';

import { HomeClickService } from './home-click.service';

describe('HomeClickService', () => {
  let service: HomeClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
