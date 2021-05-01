import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICharacter, HomeService, OauthService } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _displayName = '';
  private _loggedIn = false;
  private _membershipId = '';
  private _membershipType: number;
  private _transferStorage: string;
  private _characterTabId: string;
  private _characters: ICharacter[] = [{
    id: '1234',
    class: 'Class',
    race: 'Race',
    gender: 'Gender',
    light: 'Light Level',
    emblem: '',
    background: ''
  }];
  private _queryParamsSub: Subscription;
  private _getUserProfileSub: Subscription;
  private _oauthServiceSub: Subscription;
  private _currentUserMembershipSub: Subscription;
  private _refreshDefSub: Subscription;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private oauthService: OauthService
  ) { }

  ngOnInit() {
    this.transferStorage = localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) || 'inventory';

    this._queryParamsSub = this.route?.queryParams?.subscribe(params => { // initialize /home?:code:state route
      if (params?.code && params?.state &&
        params?.state === localStorage?.getItem(environment.LOCAL_STORAGE_STATE)) {
        // use these parameters received from bungie to store user authentication.
        // prevent oauth requests from being made with a stale "code" after refreshing the page.
        localStorage?.removeItem(environment.LOCAL_STORAGE_STATE);

        // request access token
        this.homeService?.oauthAndUserProfile(this, params?.code);
      } else {
        this._refreshDefSub = this.oauthService?.refreshExist().subscribe(refresh => {
          if (refresh['refresh-token-available']) {
            this.loggedIn = true;

            // retrieve user profile information.
            this.homeService?.userProfile(this);
          }
        });
      }
    });

  }

  ngOnChanges() {
    
  }

  public get displayName() {
    return this._displayName;
  }

  public set displayName(displayName: string) {
    this._displayName = displayName;
  }

  public get loggedIn() {
    return this._loggedIn;
  }

  public set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  public get transferStorage() {
    return this._transferStorage;
  }

  public set transferStorage(transferStorage: string) {
    if (this._transferStorage != transferStorage) {
      this._transferStorage = transferStorage;
    }
    // if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) != this.transferStorage) {
    //   localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, transferStorage);
    // }
  }

  public get membershipId() {
    return this._membershipId;
  }

  public set membershipId(membershipId: string) {
    this._membershipId = membershipId;
  }

  public get characterTabId() {
    return this._characterTabId;
  }

  public set characterTabId(characterTabId: string) {
    this._characterTabId = characterTabId;
  }

  public get membershipType() {
    return this._membershipType;
  }

  public set membershipType(membershipType: number) {
    this._membershipType = membershipType;
  }

  set characters(chars: ICharacter[]) {
    this._characters = chars;
  }

  get characters(): ICharacter[] {
    return this._characters;
  }

  set oauthServiceSub(sub: Subscription) {
    this._oauthServiceSub = sub;
  }

  get oauthServiceSub(): Subscription {
    return this._oauthServiceSub;
  }

  set getUserProfileSub(sub: Subscription) {
    this._getUserProfileSub = sub;
  }

  get getUserProfileSub(): Subscription {
    return this._getUserProfileSub;
  }

  set currentUserMembershipSub(sub: Subscription) {
    this._currentUserMembershipSub = sub;
  }

  get currentUserMembershipSub(): Subscription {
    return this._currentUserMembershipSub;
  }

  public onMiniProfileClick(characterId: string): void {
    this.characterTabId = characterId;
  }

  public onMenuToggleClick(value: string): void {
    this.transferStorage = value;
  }

  public onHomeClick(): void {
    this.characterTabId = null;
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
    if (this._getUserProfileSub) { this._getUserProfileSub.unsubscribe(); }
    if (this._oauthServiceSub) { this._oauthServiceSub.unsubscribe(); }
    if (this._currentUserMembershipSub) { this._currentUserMembershipSub.unsubscribe(); }
    if (this._refreshDefSub) { this._refreshDefSub.unsubscribe(); }
  }

}
