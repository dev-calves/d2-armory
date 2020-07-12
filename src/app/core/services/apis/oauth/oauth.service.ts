import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IOauthResponse, IOauthRefreshDefined } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private _http: HttpClient) { }

  public getAccessOauth(code: string): Observable<IOauthResponse> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('code', code);
    return this._http.get<IOauthResponse>(environment.OAUTH_ACCESS_ENDPOINT, { headers });
  }

  public deleteTokens(): Observable<IOauthResponse> {
    return this._http.get<IOauthResponse>(environment.OAUTH_DELETE_ENDPOINT);
  }

  public refreshExist(): Observable<IOauthRefreshDefined> {
    return this._http.get<IOauthRefreshDefined>(environment.OAUTH_REFRESH_ENDPOINT);
  }
}
