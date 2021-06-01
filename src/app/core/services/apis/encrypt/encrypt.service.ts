import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';

import { IEncryptRequest, IEncryptResponse, IDecryptRequest, IDecryptResponse } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor(private _http: HttpClient) { }

  public postEncrypt(state: IEncryptRequest): Observable<IEncryptResponse> {
    return this._http.post<IEncryptResponse>(environment.ENCRYPT_ENDPOINT, state);
  }

  public postDecrypt(hex: IDecryptRequest): Observable<IDecryptResponse> {
    return this._http.post<IDecryptResponse>(environment.DECRYPT_ENDPOINT, hex);
  }
}
