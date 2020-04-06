import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../../../core';

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.css']
})
export class MiniProfileComponent implements OnInit {
  private _character: Character;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set character(char: Character) {
    this._character = char;
  }

  get character(): Character {
    return this._character;
  }
}
