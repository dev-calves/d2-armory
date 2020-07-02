import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ICharacter, HomeService } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _displayName: string = "";
  private _loggedIn: boolean = false;
  private _membershipId: string = "";
  private _membershipType: number;
  private _characters: ICharacter[] = [{
    class: "Class",
    race: "Race",
    gender: "Gender",
    light: "Light Level",
    emblem: "",
    background: ""
  }];
  private _queryParamsSub: Subscription;
  private _getUserProfileSub: Subscription;
  private _oauthServiceSub: Subscription;
  private _currentUserMembershipSub: Subscription;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    // initialize /home?:code:state route
    this._queryParamsSub = this.route.queryParams.subscribe(params => {
      if (params?.code && params?.state &&
        params?.state === localStorage.getItem(environment.LOCAL_STORAGE_STATE)) { // use these parameters received from bungie to store user authentication.
        // prevent oauth requests from being made with a stale "code" after refresh.
        localStorage.removeItem(environment.LOCAL_STORAGE_STATE);

        // request access token
        this.homeService.oauthAndUserProfile(this, params?.code);
      } else if (this.cookieService.get('access-token')) {
        this.loggedIn = true;
        
        // retrieve user profile information.
        this.homeService.userProfile(this);
      }
    });

    // remove the stale state.
    if (localStorage.state) localStorage.removeItem('state');
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

  public get membershipId() {
    return this._membershipId;
  }

  public set membershipId(membershipId: string) {
    this._membershipId = membershipId;
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

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
    this._getUserProfileSub.unsubscribe();
    this._oauthServiceSub.unsubscribe();
    this._currentUserMembershipSub.unsubscribe();
  }

}
