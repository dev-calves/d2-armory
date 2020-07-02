import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment'; 
import { ICharacter } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  public getCharacters(membershipId: string, membershipType: number): Observable<ICharacter[]> {
    return this._http.get<ICharacter[]>(`${environment.CHARACTERS_ENDPOINT}?membershipId=${membershipId}&membershipType=${membershipType}`);
  }
}
