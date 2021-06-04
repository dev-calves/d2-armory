import {
  Component, 
  Output, 
  EventEmitter,
  ViewChild, 
  ElementRef, 
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';

import {
  CurrentMembershipService,
  ICharacter,
  LoggedInService
} from 'src/app/core';
import { CharacterDisplayService } from './character-display.service';


@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {
  private _characters: Observable<ICharacter[]>
  private _buttonProfileContainer: ElementRef;

  constructor(
    public loggedInService: LoggedInService,
    public currentMembershipService: CurrentMembershipService,
    private characterDisplayService: CharacterDisplayService
  ) { }

  ngOnInit() {
    this.characters = this.characterDisplayService.updateCharacters();
  }

  @Output() miniProfileClick: EventEmitter<any> = new EventEmitter<string>();

  public set characters(characters: Observable<ICharacter[]>) {
    this._characters = characters;
  }
  public get characters() {
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
   * clicked profile buttons will be highlighted and set their characterId to characterButtonSelected.
   * @param value character id
   */
  public onMiniProfileClick(value: string) {
    this.characterDisplayService.onMiniProfileClick(value, this.buttonProfileContainer, this.miniProfileClick);
  }

}
