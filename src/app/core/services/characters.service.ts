import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';

import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private _http: HttpClient) { }

  public getCharacters(): Observable<Character[]> {
    return this._http.get<Character[]>('http://localhost:3000/api/characters');
  }
}
