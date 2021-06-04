import {
  Injectable,
  EventEmitter
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  CurrentMembershipService,
  EncryptService,
  IEncryptRequest,
  IEncryptResponse,
  IOauthResponse,
  LocalStorageService,
  OauthService
} from 'src/app/core';

import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _bungieAuthUrl: string

  private _oauthSubscribeSub: Subscription
  private _encryptSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private oauthService: OauthService,
    private currentMembershipService: CurrentMembershipService,
    private encryptService: EncryptService
  ) { }

  /**
   * sends user to bungie for authentication.
   */
  public logOnClick(): void {
    let encryptRequest: IEncryptRequest;

    // capture state of web page.
    if (
      (this.localStorageService?.transferStorage === 'vault' ||
        this.localStorageService?.transferStorage === 'inventory') &&
      (this.localStorageService?.theme === 'light' ||
        this.localStorageService?.theme === 'dark')
    ) {
      encryptRequest =
      {
        state: JSON.stringify([this.localStorageService.transferStorage, this.localStorageService.theme])
      };
    } else {
      this.localStorageService.transferStorage = 'inventory';
      this.localStorageService.theme = 'light';

      encryptRequest = { state: "[\"inventory\", \"light\"]" };
    }

    // encrypt state and send user to bungie with the state.
    this._encryptSub = this.encryptService.postEncrypt(encryptRequest).subscribe(
      (response: IEncryptResponse) => {
        this._bungieAuthUrl = 'https://www.bungie.net/en/oauth/authorize?client_id=' +
          response.bungieClientId + '&response_type=code&state=' + response.hex;

        if (
          this.localStorageService.dismissLogonMessage === 'true') {
          this.localStorageService.state = response.hex;
          location.href = this._bungieAuthUrl;
        } else {
          this.openDialog(response.hex, this._bungieAuthUrl);
        }
      }
    );
  }

  /**
   * Log out user by deleting tokens and refreshing home page.
   */
  public logOutClick(): void {
    this._oauthSubscribeSub = this.oauthService.deleteTokens().subscribe((response: IOauthResponse) => {
      this.currentMembershipService.currentUserMembership = null;
      if (response.message === 'tokens deleted.') {
        location.href = '/home';
      }
    });
  }

  /**
   * launches dialog box that can send user to Bungie to be authenticated.
   * @param stateHex encrypted state.
   * @param url bungie url.
   */
  public openDialog(stateHex: string, url: string): void {
    this.dialog.open(AuthModalComponent, {
      width: '400px',
      data: {
        stateHex,
        url
      }
    });
  }

  /**
   * sends click event to home component.
   */
  public onMenuClick(menuClick: EventEmitter<any>): void {
    menuClick.emit();
  }

  public destroyOauthEncryptSub() {
    if (this._oauthSubscribeSub) {
      this._oauthSubscribeSub.unsubscribe();
    }
    if (this._encryptSub) {
      this._encryptSub.unsubscribe();
    }
  }
}
