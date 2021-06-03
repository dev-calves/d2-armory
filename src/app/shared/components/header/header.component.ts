import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { 
  EncryptService, 
  OauthService, 
  LoggedInService, 
  CurrentMembershipService, 
  HomeClickService,
  LocalStorageService
} from 'src/app/core/services';
import { IEncryptRequest } from 'src/app/core/models';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _stateHex: string;
  private _bungieAuthUrl: string;
  private _showDisplayName: boolean = true;

  private _oauthSubscribeSub: Subscription;
  private _encryptSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private encryptService: EncryptService,
    private oauthService: OauthService,
    public loggedInService: LoggedInService,
    public currentMembershipService: CurrentMembershipService,
    private homeClickService: HomeClickService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // hide display name when the screen is small.
    if (window.innerWidth < 480) {
      this.showDisplayName = false;
    }
  }

  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();

  public set showDisplayName(showDisplayName: boolean) {
    this._showDisplayName = showDisplayName;
  }
  public get showDisplayName() {
    return this._showDisplayName;
  }

  /**
   * sends user to bungie for authentication.
   */
  public logOnClick(): void {
    let encryptRequest: IEncryptRequest;

    // capture state of web page.
    if (
      this.localStorageService.transferStorage &&
      this.localStorageService.transferStorage === 'vault' ||
      this.localStorageService.transferStorage === 'inventory') {
      encryptRequest = { state: this.localStorageService.transferStorage };
    } else {
      encryptRequest = { state: 'inventory' };
    }

    // encrypt state and send user to bungie with the state.
    this._encryptSub = this.encryptService.postEncrypt(encryptRequest).subscribe(
      response => {
        this._stateHex = response.hex;
        this._bungieAuthUrl = 'https://www.bungie.net/en/oauth/authorize?client_id=' +
          response.bungieClientId + '&response_type=code&state=' + this._stateHex;

        if (
          this.localStorageService.dismissLogonMessage === 'true') {
          this.localStorageService.state = this._stateHex;
          location.href = this._bungieAuthUrl;
        } else {
          this.openDialog(this._stateHex, this._bungieAuthUrl);
        }
      }
    );
  }

  /**
   * Log out user by deleting tokens and refreshing home page.
   */
  public logOutClick(): void {
    this._oauthSubscribeSub = this.oauthService.deleteTokens().subscribe(response => {
      this.currentMembershipService.currentUserMembership = null;
      if (response.message === 'tokens deleted.') {
        location.href = '/home';
      }
    });
  }

  /**
   * sends click event to home component.
   */
  public onMenuClick(): void {
    this.menuClick.emit();
  }

  /**
   * sends click event to home component.
   */
  public onHomeClick(): void {
    this.homeClickService.onHomeClick();
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
   * decide to show display name based on window size for all devices.
   * @param event ignored.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 480) {
      this.showDisplayName = false;
    } else if (window.innerWidth > 480) {
      this.showDisplayName = true;
    }
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
