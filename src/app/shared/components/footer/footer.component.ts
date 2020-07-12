import { Component, Input, DoCheck } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements DoCheck {
  private _displayName = '';
  private _steamId = '76561198276048723';
  private _steamName = 'cedric401';
  private _steamProfileLink = 'https://steamcommunity.com/id/cedric401/';
  private _storage: 'vault' | 'inventory' = 'vault';
  private _loggedIn = false;

  constructor() { }

  ngDoCheck(): void {
    if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) &&
      localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'vault' ||
      localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'inventory') {
      this.storage = localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) as 'vault' | 'inventory';
    }
  }

  @Input()
  public set displayName(name: string) {
    this._displayName = name;
  }

  public get displayName(): string {
    return this._displayName;
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

  public set storage(storage: 'vault' | 'inventory') {
    this._storage = storage;
  }

  public get storage(): 'vault' | 'inventory' {
    return this._storage;
  }

  @Input()
  public set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  public get loggedIn(): boolean {
    return this._loggedIn;
  }
}
