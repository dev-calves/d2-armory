import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';

import { EncryptRequest, IEncryptResponse, DecryptRequest, IDecryptResponse } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor(private _http: HttpClient) { }

  public postEncrypt(state: EncryptRequest): Observable<IEncryptResponse> {
    return this._http.post<IEncryptResponse>(environment.ENCRYPT_ENDPOINT, state);
  }

  public postDecrypt(hex: DecryptRequest): Observable<IDecryptResponse> {
    return this._http.post<IDecryptResponse>(environment.DECRYPT_ENDPOINT, hex);
  }
}
