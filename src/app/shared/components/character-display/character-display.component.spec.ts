import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterDisplayComponent } from './character-display.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacter, CharactersService } from 'src/app/core';
import { mockCharacters } from './mocks/mock-characters';

describe('HeaderComponent', () => {
  let component: CharacterDisplayComponent;
  let fixture: ComponentFixture<CharacterDisplayComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  class MockCharactersService {
    public getCharacters(): Observable<ICharacter[]>{
      return new Observable<ICharacter[]>(subscriber => {
        subscriber.next(mockCharacters);
        subscriber.complete();
      });
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ CharacterDisplayComponent ],
      providers: [
        HttpClient,
        {provide: CharactersService, useClass: MockCharactersService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CharacterDisplayComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize characters after subscribing to the service', () => {
    expect(component.characters).toEqual(mockCharacters);
  });

  it('should set a list of characters', () => {
    component.characters = [{id: '', class: 'qwerty', race: '', gender: '', light: '', emblem: '', background: ''}];
    expect(component.characters[0].class).toContain('qwerty');
  });

});
