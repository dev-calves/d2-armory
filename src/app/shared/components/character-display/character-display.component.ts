import {
  Component, Output, EventEmitter,
  ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  CharactersService,
  CurrentMembershipService,
  HighlightMiniProfileService,
  ICharacter,
  LoggedInService
} from 'src/app/core';


@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  private _characters: ICharacter[];
  private _buttonProfileContainer: ElementRef;
  private _characterSub: Subscription;

  constructor(
    private characterService: CharactersService,
    private highlightService: HighlightMiniProfileService,
    public loggedInService: LoggedInService,
    public currentMembershipService: CurrentMembershipService
  ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.updateCharacters();
  }

  @Output() miniProfileClick: EventEmitter<any> = new EventEmitter<string>();

  set characters(chars: ICharacter[]) {
    this._characters = chars;
  }
  get characters(): ICharacter[] {
    return this._characters;
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
      this._characterSub = this.characterService.getCharacters(this.currentMembershipService.membershipId,
        this.currentMembershipService.membershipType).subscribe((characterResponse: ICharacter[]) => {

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
