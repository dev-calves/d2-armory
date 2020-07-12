import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthModalComponent } from '../../auth-modal/auth-modal.component';
import { OauthService } from 'src/app/core/services/apis/oauth/oauth.service';
import { LogInOutButtonService } from 'src/app/core';

@Component({
  selector: 'app-log-in-out-button',
  templateUrl: './log-in-out-button.component.html',
  styleUrls: ['./log-in-out-button.component.css']
})
export class LogInOutButtonComponent implements OnInit, OnDestroy {
  private _loggedIn = false;
  private _oauthSubscribeSub: Subscription;
  private _mouseOverIcon = 'mood';
  private _bungieAuthUrl: string;
  private _encryptSub: Subscription;
  private _stateHex: string;

  constructor(
    private dialog: MatDialog,
    private oauthService: OauthService,
    private logInOutButtonService: LogInOutButtonService
  ) { }

  ngOnInit(): void {

  }

  public openDialog(stateHex: string, url: string): void {
    this.dialog.open(AuthModalComponent, {
      width: '400px',
      data: {
        stateHex,
        url
      }
    });
  }

  public logOnClick(): void {
    this.logInOutButtonService.encryptStateAndLinkToBungie(this);
  }

  public logOutClick(): void {
    this._oauthSubscribeSub = this.oauthService.deleteTokens().subscribe(response => {
      if (response.message === 'tokens deleted.') {
        location.href = '/home';
      }
    });
  }

  public mouseOver(): void {
    this.mouseOverIcon = 'mood_bad';
  }

  public mouseOut(): void {
    this.mouseOverIcon = 'mood';
  }

  public set stateHex(stateHex: string) {
    this._stateHex = stateHex;
  }

  public get stateHex(): string {
    return this._stateHex;
  }

  public get bungieAuthUrl(): string {
    return this._bungieAuthUrl;
  }

  public set bungieAuthUrl(url: string) {
    this._bungieAuthUrl = url;
  }

  public get encryptSub(): Subscription {
    return this._encryptSub;
  }

  public set encryptSub(sub: Subscription) {
    this._encryptSub = sub;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  @Input()
  set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  get mouseOverIcon(): string {
    return this._mouseOverIcon;
  }

  set mouseOverIcon(icon: string) {
    this._mouseOverIcon = icon;
  }

  ngOnDestroy() {
    if (this._oauthSubscribeSub) {
      this._oauthSubscribeSub.unsubscribe();
    }
    if (this._encryptSub) {
      this._encryptSub.unsubscribe();
    }
  }
}
