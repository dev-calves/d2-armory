import { Injectable } from '@angular/core';
import { map, concatMap } from 'rxjs/operators';

import { CurrentUserMembershipService } from '../apis/current-user-membership/current-user-membership.service';
import { CharactersService } from '../apis/characters/characters.service';
import { OauthService } from '../apis/oauth/oauth.service';
import { HomeComponent } from 'src/app/home/pages/home/home.component';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private oauthService: OauthService,
    private currentUserMembershipService: CurrentUserMembershipService,
    private charactersService: CharactersService) { }

  public oauthAndUserProfile(homeReference: HomeComponent, code: string): void {
    // retrieve user profile and characters.
    homeReference.oauthServiceSub = this.oauthService.postAccessOauth(code).subscribe(
      oauthAccessResponse => {
        if (oauthAccessResponse.message.includes('tokens recieved')) {
          // retrieve user profile information after tokens are made available.
          homeReference.loggedIn = true;
          this.userProfile(homeReference);
        }
      });
  }

  public userProfile(homeReference: HomeComponent): void {
    // retrieve user profile and characters.
    homeReference.currentUserMembershipSub = this.currentUserMembershipService.getCurrentUserMembership().pipe(
      map(currentUserMembership => {
        homeReference.displayName = currentUserMembership.displayName;
        return currentUserMembership;
      }),
      concatMap(currentUserMembership => this.charactersService.getCharacters(
        currentUserMembership.membershipId, currentUserMembership.membershipType)),
    ).subscribe(charactersResponse => homeReference.characters = charactersResponse);
  }
}
