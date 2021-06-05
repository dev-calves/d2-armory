import { Injectable } from '@angular/core';

import { iif, of, Subscription } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { ICurrentUserMembership, IOauthRefreshDefined, IOauthResponse } from '../../models';
import { CurrentUserMembershipService, OauthService } from '../apis';
import { LoggedInService } from '../logged-in';

@Injectable({
  providedIn: 'root'
})
export class CurrentMembershipService {
  private _currentUserMembership: ICurrentUserMembership;
  private _displayName: string;
  private _membershipId: string;
  private _membershipType: string;

  private _currentUserMembershipSub: Subscription

  constructor(
    private currentUserMembershipService: CurrentUserMembershipService,
    private oauthService: OauthService,
    private loggedInService: LoggedInService
  ) {
    // this.userProfile();
  }

  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;

    if (currentUserMembership) {
      this.displayName = currentUserMembership.displayName;
      this.membershipId = currentUserMembership.membershipId;
      this.membershipType = currentUserMembership.membershipType;
    } else {
      this.displayName = null;
      this.membershipId = null;
      this.membershipType = null;
    }
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  public set displayName(displayName: string) {
    this._displayName = displayName;
  }
  public get displayName() {
    return this._displayName;
  }

  public set membershipId(membershipId: string) {
    this._membershipId = membershipId;
  }
  public get membershipId() {
    return this._membershipId;
  }

  public set membershipType(membershipType: string) {
    this._membershipType = membershipType;
  }
  public get membershipType() {
    return this._membershipType;
  }

  /**
   * retrieves access tokens and retrieves user data.
   * @param code code sent by bungie to create a token.
   * @returns user data observable.
   */
  public oauthAndUserProfile(code: string): void {
    this._currentUserMembershipSub = this.oauthService.getAccessOauth(code).pipe(
      // send request to retrieve tokens.
      map((oauthAccessResponse: IOauthResponse) => {
        return oauthAccessResponse;
      }),
      // after response is received...
      concatMap((oauthAccessResponse: IOauthResponse) =>
        // if tokens are created successfully, return the currentUserMembership observable.
        iif(() => (oauthAccessResponse?.message?.includes('tokens recieved')),
          this.currentUserMembershipService.getCurrentUserMembership(),
          of(null)
        )
      )
    ).subscribe((currentUserMembershipResponse: ICurrentUserMembership) => {
      if (currentUserMembershipResponse) {
        this.currentUserMembership = currentUserMembershipResponse;
        this.displayName = currentUserMembershipResponse.displayName;
        this.membershipId = currentUserMembershipResponse.membershipId;
        this.membershipType = currentUserMembershipResponse.membershipType;
  
        this.loggedInService.loggedIn = true;
      }
    });
  }

  /**
   * requests to check if refresh token is available then returns user data.
   */
  public userProfile(): void {
    this._currentUserMembershipSub = this.oauthService.refreshExist().pipe(
      // send request for refresh token status.
      map((refresh: IOauthRefreshDefined) => {
        return refresh;
      }),
      // after response is received...
      concatMap((refresh: IOauthRefreshDefined) =>
        // if the refresh token exists, return currentUserMembership observable.
        iif(() => (refresh['refresh-token-available']),
          this.currentUserMembershipService.getCurrentUserMembership(),
          of(null)
        )
      )
    ).subscribe((currentUserMembershipResponse: ICurrentUserMembership) => {
      if (currentUserMembershipResponse) {
        this.currentUserMembership = currentUserMembershipResponse;
        this.displayName = currentUserMembershipResponse.displayName;
        this.membershipId = currentUserMembershipResponse.membershipId;
        this.membershipType = currentUserMembershipResponse.membershipType;
  
        this.loggedInService.loggedIn = true;
      }
    });
  }

  public destroyCurrentUserMembershipSub() {
    if (this._currentUserMembershipSub) {
      this._currentUserMembershipSub.unsubscribe();
    }
  }

}
