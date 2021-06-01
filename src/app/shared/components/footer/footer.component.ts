import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  private _steamProfileLink: string = 'https://steamcommunity.com/id/cedric401/';

  constructor() { }

  public set steamProfileLink(name: string) {
    this._steamProfileLink = name;
  }

  public get steamProfileLink(): string {
    return this._steamProfileLink;
  }
}
