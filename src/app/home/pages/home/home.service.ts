import {
  Injectable,
  ViewContainerRef,
  ViewRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { iif, Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { CurrentUserMembershipService } from 'src/app/core/services/apis/current-user-membership/current-user-membership.service';
import { OauthService } from 'src/app/core/services/apis/oauth/oauth.service';
import { CharacterComponent } from 'src/app/home/components/character/character.component';
import { ICurrentUserMembership, IOauthResponse, IOauthRefreshDefined } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _charactersContainer: ViewContainerRef;
  private _cachedComponents: Map<string, ViewRef> = new Map<string, ViewRef>();

  constructor(
    private oauthService: OauthService,
    private currentUserMembershipService: CurrentUserMembershipService,
    private resolver: ComponentFactoryResolver) { }

  public set charactersContainer(container: ViewContainerRef) {
    this._charactersContainer = container;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  /**
   * chooses which character tab to display when a miniprofile is clicked on.
   * @param characterId character id.
   */
  public onMiniProfileClick(
    characterId: string
    ): void {
    // clear character view.
    if (this.charactersContainer) {
      this.charactersContainer.detach();
    }

    if (characterId) {
      if (this._cachedComponents.get(characterId)) {
        // retrieve view from cache for existing view.
        this.charactersContainer.insert(this._cachedComponents.get(characterId));
      } else {
        // create the character view.
        const characterFactory = this.resolver.resolveComponentFactory(CharacterComponent);
        const ref: ComponentRef<CharacterComponent> = this.charactersContainer.createComponent(characterFactory);

        ref.instance.characterId = characterId;

        // store view in cache.
        this._cachedComponents.set(characterId, this.charactersContainer.get(0));
      }
    }
  }

  /**
   * retrieves access tokens and retrieves user data.
   * @param code code sent by bungie to create a token.
   * @returns user data observable.
   */
  public oauthAndUserProfile(code: string): Observable<ICurrentUserMembership> {
    return this.oauthService.getAccessOauth(code).pipe(
      // send request to retrieve tokens.
      map((oauthAccessResponse: IOauthResponse) => {
        return oauthAccessResponse;
      }),
      // after response is received...
      concatMap((oauthAccessResponse: IOauthResponse) =>
        // if tokens are created successfully, return the currentUserMembership observable.
        iif(() => (oauthAccessResponse?.message?.includes('tokens recieved')),
          this.currentUserMembershipService.getCurrentUserMembership()
        )
      )
    );
  }

  /**
   * requests to check if refresh token is available then returns user data.
   * @returns user data observable.
   */
  public userProfile(): Observable<ICurrentUserMembership> {
    return this.oauthService.refreshExist().pipe(
      // send request for refresh token status.
      map((refresh: IOauthRefreshDefined) => {
        return refresh;
      }),
      // after response is received...
      concatMap((refresh: IOauthRefreshDefined) =>
        // if the refresh token exists, return currentUserMembership observable.
        iif(() => (refresh['refresh-token-available']),
          this.currentUserMembershipService.getCurrentUserMembership()
        )
      )
    );
  }

  /**
   * destroy refs
   */
  public destroy() {
    this._cachedComponents.forEach((viewRef: ViewRef) => {
      viewRef.destroy();
    });
  }
}
