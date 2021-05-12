import { Component, Input, Output, EventEmitter, Renderer2, 
  ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CharactersService, ICharacter, ICurrentUserMembership } from 'src/app/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _loggedIn: boolean;
  private _characters: ICharacter[];
  private _buttonProfileContainer: ElementRef;
  private _characterButtonSelected: Element;
  private _showDisabled: boolean = true;
  private _currentUserMembership: ICurrentUserMembership;
  private _characterSub: Subscription;

  constructor(private renderer: Renderer2,
    private characterService: CharactersService) { }

  ngOnInit() {
    this.characters = [{
      id: environment.DEFAULT_CHARACTER_ID,
      class: environment.DEFAULT_CHARACTER_CLASS,
      race: environment.DEFAULT_CHARACTER_RACE,
      gender: environment.DEFAULT_CHARACTER_GENDER,
      light: environment.DEFAULT_CHARACTER_LIGHT,
      emblem: environment.DEFAULT_CHARACTER_EMBLEM,
      background: environment.DEFAULT_CHARACTER_BACKGROUND
    }];
  }

  @Output() miniProfileClick: EventEmitter<any> = new EventEmitter<string>();

  @Output() homeClick: EventEmitter<any> = new EventEmitter<any>();

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

  set showDisabled(showDisabled: boolean) {
    this._showDisabled = showDisabled;
  }

  get showDisabled() {
    return this._showDisabled
  }

  @ViewChild('buttonProfileContainer')
  set buttonProfileContainer(element: ElementRef) {
    this._buttonProfileContainer = element;
  }

  get buttonProfileContainer() {
    return this._buttonProfileContainer;
  }

  private updateCharacters() {
    this._characterSub = this.characterService.getCharacters(this.currentUserMembership.membershipId,
      this.currentUserMembership.membershipType).subscribe((characterResponse: ICharacter[]) => {

        this.characters = characterResponse;
        this.showDisabled = false;
      });
  }

  public onHomeClick(): void {
    if (this._characterButtonSelected) {
      this.renderer.removeStyle(this._characterButtonSelected, 'background-color');
    }

    this.homeClick.emit();
  }

  public onMiniProfileClick(value: any) {
    const buttons: HTMLCollection = this.buttonProfileContainer.nativeElement.children;

    if (this._characterButtonSelected) {
      this.renderer.removeStyle(this._characterButtonSelected, 'background-color');
    }

    this._characterButtonSelected = Array.from(buttons).find(button => button.id === value);
    this.renderer.setStyle(this._characterButtonSelected, 'background-color', 'beige');

    this.miniProfileClick.emit(value);
  }

  ngOnDestroy() {
    if (this._characterSub) { this._characterSub.unsubscribe(); }
  }

}
