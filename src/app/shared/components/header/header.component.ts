import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character, CharactersService } from '../../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // TODO: initialize this property with the number of characters
  // returned by the destiny/users api.
  private charactersSub: Subscription;
  private _characters: Character[] = [
    {
      class: "Class",
      race: "Race",
      gender: "Gender",
      light: "Light Level",
      emblem: "",
      background: ""
    }];

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    // TODO: if the user is logged-in (session cookie created by node), make a request
    // to the node service that calls destiny/users/profile to get characters.
    // look for the character in use by finding the character with a current session alloted time.
    if (true) {
      this.charactersSub = this.charactersService.getCharacters()
      .pipe().subscribe(response => {
        this.characters = response;
      });
    }
  }

  set characters(chars: Character[]) {
    this._characters = chars;
  }

  get characters(): Character[] {
    return this._characters;
  }

  ngOnDestroy(): void {
    this.charactersSub.unsubscribe();
  }

}
