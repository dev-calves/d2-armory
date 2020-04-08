import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private _userLoggedOutLabel: string = environment.page.home.LOGGED_OUT_USERNAME_LABEL;
  private _userLoggedInLabel: string = environment.page.home.LOGGED_IN_USERNAME_LABEL;
  private _menuToggleLabel: string = environment.page.home.MENU_TOGGLE_LABEL;
  private _username: string = "Cedric401"; // TODO: init with service.
  private _addMeLabel: string = environment.page.home.SHAMELESS_PLUG;
  private _steamId: string = environment.page.home.SHAMELESS_PLUG_ID;
  private _steamName: string = environment.page.home.SHAMELESS_PLUG_USERNAME;
  private _steamProfileLink: string = environment.page.home.STEAM_PROFILE_LINK;

  constructor() { }

  ngOnInit(): void {}

  public set userLoggedOutLabel(label: string) {
    this._userLoggedOutLabel = label;
  }

  public get userLoggedOutLabel(): string {
    return this._userLoggedOutLabel;
  }

  public set userLoggedInLabel(label: string) {
    this._userLoggedInLabel = label;
  }

  public get userLoggedInLabel(): string {
    return this._userLoggedInLabel;
  }

  public set menuToggleLabel(label: string) {
    this._menuToggleLabel = label;
  }

  public get menuToggleLabel(): string {
    return this._menuToggleLabel;
  }

  public set username(name: string) {
    this._username = name;
  }

  public get username(): string {
    return this._username;
  }

  public set addMeLabel(label: string) {
    this._addMeLabel = label;
  }

  public get addMeLabel(): string {
    return this._addMeLabel;
  }

  public set steamId(id: string) {
    this._steamId = id;
  }

  public get steamId(): string {
    return this._steamId;
  }

  public set steamName(name: string) {
    this._steamName = name;
  }

  public get steamName(): string {
    return this._steamName;
  }

  public set steamProfileLink(name: string) {
    this._steamProfileLink = name;
  }

  public get steamProfileLink(): string {
    return this._steamProfileLink;
  }
}
