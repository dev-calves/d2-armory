import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import { ICurrentUserMembership } from '../../../models/api/current-user-membership-response.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserMembershipService {

  constructor(private _http: HttpClient) { }

  public getCurrentUserMembership(): Observable<ICurrentUserMembership> {
    return this._http.get<ICurrentUserMembership>(environment.CURRENT_USER_MEMBERSHIP_ENDPOINT);
  }
}
