import { Component, Input, Output, EventEmitter,
  ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CharactersService, HighlightMiniProfileService, ICharacter, ICurrentUserMembership } from 'src/app/core';


@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit, OnDestroy {
  private _loggedIn: boolean;
  private _characters: ICharacter[];
  private _buttonProfileContainer: ElementRef;
  private _currentUserMembership: ICurrentUserMembership;
  private _characterSub: Subscription;

  constructor(
    private characterService: CharactersService,
    private highlightService: HighlightMiniProfileService) { }

  ngOnInit() { }

  @Output() miniProfileClick: EventEmitter<any> = new EventEmitter<string>();

  set characters(chars: ICharacter[]) {
    this._characters = chars;
  }
  get characters(): ICharacter[] {
    return this._characters;
  }

  @Input()
  set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;

    if (currentUserMembership) {
      this.updateCharacters();
    }
  }
  get currentUserMembership() {
    return this._currentUserMembership;
  }

  @Input()
  set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  @ViewChild('buttonProfileContainer')
  set buttonProfileContainer(element: ElementRef) {
    this._buttonProfileContainer = element;
  }

  get buttonProfileContainer() {
    return this._buttonProfileContainer;
  }

  /**
   * makes a requests for characters then initializes the characters property.
   */
  private updateCharacters() {
    this._characterSub = this.characterService.getCharacters(this.currentUserMembership.membershipId,
      this.currentUserMembership.membershipType).subscribe((characterResponse: ICharacter[]) => {

        this.characters = characterResponse;
      });
  }

  /**
   * clicked profile buttons will be highlighted and set their characterId to characterButtonSelected.
   * @param value character id
   */
  public onMiniProfileClick(value: any) {
    const buttons: HTMLCollection = this.buttonProfileContainer.nativeElement.children;

    this.highlightService.removeCharacterHighlight();
    this.highlightService.characterButtonSelected = Array.from(buttons).find(button => button.id === value);
    this.highlightService.addCharacterHighlight();

    this.miniProfileClick.emit(value);
  }

  ngOnDestroy() {
    if (this._characterSub) { this._characterSub.unsubscribe(); }
  }

}
