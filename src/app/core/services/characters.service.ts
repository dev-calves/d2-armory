import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from '../../../environments/environment'; 
import { Character } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  public getCharacters(): Observable<Character[]> {
    
    return this._http.get<Character[]>(environment.api.characters.ENDPOINT);
  }
}
