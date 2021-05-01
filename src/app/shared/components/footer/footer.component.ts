import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  private _displayName: string  = '';
  private _steamId: string = '76561198276048723';
  private _steamName: string = 'cedric401';
  private _steamProfileLink: string = 'https://steamcommunity.com/id/cedric401/';
  private _transferStorage: string = 'inventory';
  private _loggedIn = false;

  constructor() { }

  @Output() menuToggleClickEvent: EventEmitter<any> = new EventEmitter<string>();

  public onMenuToggleClick(value: 'vault' | 'inventory'): void {
    this.transferStorage = value;

    this.menuToggleClickEvent.emit(value);
  }

  @Input()
  public set displayName(name: string) {
    this._displayName = name;
  }

  public get displayName(): string {
    return this._displayName;
  }

  @Input()
  public set transferStorage(transferStorage: string) {
    this._transferStorage = transferStorage;
  }

  public get transferStorage(): string {
    return this._transferStorage;
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

  @Input()
  public set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  public get loggedIn(): boolean {
    return this._loggedIn;
  }
}
