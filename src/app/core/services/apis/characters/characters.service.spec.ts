import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CharactersService } from '../../';
import { Observable } from 'rxjs';
import { ICharacter } from '../../../models';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(CharactersService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable after making an http call', () => {
    spyOn(httpClient, 'get').and.returnValue(new Observable());
    const response: Observable<ICharacter[]> = service.getCharacters('id123', 0);
    expect(response).toBeTruthy();
  });
});
