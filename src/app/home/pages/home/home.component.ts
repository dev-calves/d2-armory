import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  CurrentMembershipService,
  HomeClickService,
  LocalStorageService,
  LoggedInService
} from 'src/app/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _charactersContainer: ViewContainerRef;
  private _homePageContainer: ElementRef;
  private _queryParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public homeService: HomeService,
    public currentMembershipService: CurrentMembershipService,
    private homeClickService: HomeClickService,
    public loggedInService: LoggedInService,
    public localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    // initialize /home?:code:state route
    this._queryParamsSub = this.route?.queryParams?.subscribe((params: Params) => { 
      // use these parameters received from bungie to store user authentication.
      if (params.code && params.state && params.state === 
          this.localStorageService.state) {
        // prevent oauth requests from being made with a stale "code" after refreshing the page.
        this.localStorageService.state = null;

        // request access token and user data.
        this.currentMembershipService.oauthAndUserProfile(params.code);
        }
    });
  }

  @ViewChild('HomePageContainer')
  public set homePageContainer(element: ElementRef) {
    this._homePageContainer = element;
  }
  public get homePageContainer() {
    return this._homePageContainer;
  }

  @ViewChild('charactersContainer', { read: ViewContainerRef })
  public set charactersContainer(container: ViewContainerRef) {
    this._charactersContainer = container;

    // pass the container to the home click service for home navigation
    // by detaching the character view.
    this.homeClickService.charactersContainer = container;

    // pass the container to the service for component creations.
    this.homeService.charactersContainer = container;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
  }

}
