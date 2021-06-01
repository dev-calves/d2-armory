import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  Renderer2,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';

import {
  ICurrentUserMembership,
  OverlaySpinnerService
} from 'src/app/core';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _loggedIn = false;
  private _transferStorage: string;
  private _currentUserMembership: ICurrentUserMembership;
  private _charactersContainer: ViewContainerRef;
  private _overlaySpinnerContainer: ViewContainerRef;
  private _darkModeSlideToggle: MatSlideToggle;
  private _homePageContainer: ElementRef;
  private _queryParamsSub: Subscription;
  private _currentUserMembershipSub: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private overlaySpinnerService: OverlaySpinnerService,
    private renderer: Renderer2,
    public homeService: HomeService,
  ) { }

  ngOnInit() {
    // set the storage localStorage property.
    this.transferStorage = localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) || 'inventory';

    this._queryParamsSub = this.route?.queryParams?.subscribe((params: Params) => { // initialize /home?:code:state route
      // use these parameters received from bungie to store user authentication.
      if (params.code && params.state && params.state === localStorage.getItem(environment.LOCAL_STORAGE_STATE)) {
        // prevent oauth requests from being made with a stale "code" after refreshing the page.
        localStorage.removeItem(environment.LOCAL_STORAGE_STATE);

        // request access token and user data.
        this._currentUserMembershipSub = this.homeService.oauthAndUserProfile(params.code)
          .subscribe((currentUserMembershipResponse: ICurrentUserMembership) => {
            this.loggedIn = true;
            this.currentUserMembership = currentUserMembershipResponse;
          });
      } else {
        // request user data.
        this._currentUserMembershipSub = this.homeService.userProfile()
          .subscribe((currentUserMembershipResponse: ICurrentUserMembership) => {
            this.loggedIn = true;
            this.currentUserMembership = currentUserMembershipResponse;
          });
      }
    });
  }

  public set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }
  public get loggedIn() {
    return this._loggedIn;
  }

  public set transferStorage(transferStorage: string) {
    if (this._transferStorage != transferStorage) {
      this._transferStorage = transferStorage;
    }
    // TODO: remove this storage prop. after implementing DB.
    if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) != this.transferStorage) {
      localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, transferStorage);
    }
  }
  public get transferStorage() {
    return this._transferStorage;
  }

  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
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

    // pass the container to the service for component creations.
    this.homeService.charactersContainer = this.charactersContainer;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  @ViewChild('overlaySpinnerContainer', { read: ViewContainerRef })
  public set overlaySpinnerContainer(container: ViewContainerRef) {
    this._overlaySpinnerContainer = container;

    this.overlaySpinnerService.overlaySpinnerContainerRef = container;
  }
  public get overlaySpinnerContainer() {
    return this._overlaySpinnerContainer;
  }

  @ViewChild('darkModeSlideToggle')
  public set darkModeSlideToggle(slideToggle: MatSlideToggle) {
    this._darkModeSlideToggle = slideToggle;

    this.changeThemeMode('');
  }
  public get darkModeSlideToggle() {
    return this._darkModeSlideToggle;
  }

  public changeThemeMode(theme: string) {
    switch (theme) {
      case 'dark':
        this.renderer.addClass(this.homePageContainer.nativeElement, 'darkMode');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        this.renderer.removeClass(this.homePageContainer.nativeElement, 'darkMode');
        localStorage.setItem('theme', 'light');
        break;
      default:
        if (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) {

          this.darkModeSlideToggle.toggle();
          this.changeDetectorRef.detectChanges();

          this.renderer.addClass(this.homePageContainer.nativeElement, 'darkMode');

          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
        break;
    }
  }

  /**
   * updates transferStorage and localStorage.
   * @param value 
   */
  public onMenuToggleClick(value: string): void {
    this.transferStorage = value;
  }

  /**
   * modifies transferStorage on toggle.
   * @param slideToggle event data for the slide toggle component.
   */
  public onVaultToggleChange(slideToggle: MatSlideToggleChange) {
    if (slideToggle.checked) {
      this.transferStorage = 'vault';
    } else {
      this.transferStorage = 'inventory';
    }
  }

  public onDarkModeToggleChange(slideToggle: MatSlideToggle) {
    if (slideToggle.checked) {
      this.changeThemeMode('dark');
    } else {
      this.changeThemeMode('light');
    }
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
    if (this._currentUserMembershipSub) { this._currentUserMembershipSub.unsubscribe(); }
  }

}
