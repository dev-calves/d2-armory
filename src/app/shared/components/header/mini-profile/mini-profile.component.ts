import { Component, OnInit, Input } from '@angular/core';
import { ICharacter } from 'src/app/core';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {
  private _character: ICharacter;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set character(char: ICharacter) {
    this._character = char;
  }

  get character(): ICharacter {
    return this._character;
  }
}
