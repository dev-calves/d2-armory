import { 
  Injectable,
  ElementRef,
  EventEmitter 
} from '@angular/core';

import { Observable } from 'rxjs';

import {
  CharactersService,
  CurrentMembershipService,
  HighlightMiniProfileService,
  ICharacter
} from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterDisplayService {
  private _characters: Observable<ICharacter[]>;

  constructor(
    private characterService: CharactersService,
    private highlightService: HighlightMiniProfileService,
    private currentMembershipService: CurrentMembershipService,
  ) {}

  public set characters(characters: Observable<ICharacter[]>) {
    this._characters = characters;
  }

  public get characters() {
    return this._characters;
  }

  /**
   * makes a requests for characters then initializes the characters property.
   */
  public updateCharacters(): Observable<ICharacter[]> {
    return this.characterService.getCharacters(this.currentMembershipService.membershipId,
      this.currentMembershipService.membershipType);
    }

  /**
   * clicked profile buttons will be highlighted and set their characterId to characterButtonSelected.
   * @param value character id
   */
  public onMiniProfileClick(value: string, buttonProfileContainer: ElementRef, miniProfileClick: EventEmitter<any>) {
    const buttons: HTMLCollection = buttonProfileContainer.nativeElement.children;

    this.highlightService.removeCharacterHighlight();
    this.highlightService.characterButtonSelected = Array.from(buttons).find(button => button.id === value);
    this.highlightService.addCharacterHighlight();

    miniProfileClick.emit(value);
  }
}
