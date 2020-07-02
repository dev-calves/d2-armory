import { Component, Input } from '@angular/core';
import { ICharacter } from 'src/app/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private _characters: ICharacter[];

  constructor() { }

  @Input()
  set characters(chars: ICharacter[]) {
    this._characters = chars;
  }

  get characters(): ICharacter[] {
    return this._characters;
  }

}
