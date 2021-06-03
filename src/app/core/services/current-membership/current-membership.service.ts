import { Injectable } from '@angular/core';
import { ICurrentUserMembership } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CurrentMembershipService {
  private _currentUserMembership: ICurrentUserMembership;
  private _displayName: string;
  private _membershipId: string;
  private _membershipType: string;

  constructor() { }

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

}
