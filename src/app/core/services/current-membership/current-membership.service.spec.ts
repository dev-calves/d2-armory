import { TestBed } from '@angular/core/testing';

import { CurrentMembershipService } from './current-membership.service';

describe('CurrentUserMembershipService', () => {
  let service: CurrentMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
