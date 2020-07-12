import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CurrentUserMembershipService } from '../../';
import { Observable } from 'rxjs';
import { ICurrentUserMembership } from '../../../models';

describe('CurrentUserMembershipService', () => {
  let service: CurrentUserMembershipService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(CurrentUserMembershipService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable after making an http call', () => {
    spyOn(httpClient, 'get').and.returnValue(new Observable());
    const response: Observable<ICurrentUserMembership> = service.getCurrentUserMembership();
    expect(response).toBeTruthy();
  });
});
