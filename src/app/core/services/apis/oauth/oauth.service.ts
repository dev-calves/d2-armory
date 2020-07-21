import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IOauthResponse, IOauthRefreshDefined } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private _http: HttpClient) { }

  public postAccessOauth(code: string): Observable<IOauthResponse> {
    return this._http.post<IOauthResponse>(environment.OAUTH_ACCESS_ENDPOINT, { code: code });
  }

  public deleteTokens(): Observable<IOauthResponse> {
    return this._http.get<IOauthResponse>(environment.OAUTH_DELETE_ENDPOINT);
  }

  public refreshExist(): Observable<IOauthRefreshDefined> {
    return this._http.get<IOauthRefreshDefined>(environment.OAUTH_REFRESH_ENDPOINT);
  }
}
