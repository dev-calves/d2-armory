import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CurrentMembershipService, LocalStorageService, OverlaySpinnerService, TransferStorageService } from './core';

import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private _appContainer: ElementRef;
  private _darkModeSlideToggle: MatSlideToggle;
  private _overlaySpinnerContainer: ViewContainerRef;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private overlaySpinnerService: OverlaySpinnerService,
    public transferStorageService: TransferStorageService,
    private localStorageService: LocalStorageService,
    private currentMembershipService: CurrentMembershipService,
    private overlay: OverlayContainer
    ) {

  }

  ngOnInit() {
    // set the storage localStorage property.
    this.transferStorageService.transferStorage = 
      this.localStorageService.transferStorage;

    this.currentMembershipService.userProfile();
  }

  ngAfterViewInit() {
    if (this.localStorageService.isDarkMode()) {
      this.changeThemeMode('dark');
      this.darkModeSlideToggle.toggle();
      this.changeDetectorRef.detectChanges();
    } else if (!this.localStorageService.theme) {
      this.changeThemeMode('');
    }
  }

  @ViewChild('appContainer')
  public set appContainer(appContainer: ElementRef) {
    this._appContainer = appContainer;
  }
  public get appContainer() {
    return this._appContainer;
  }

  @ViewChild('darkModeSlideToggle')
  public set darkModeSlideToggle(slideToggle: MatSlideToggle) {
    this._darkModeSlideToggle = slideToggle;
  }
  public get darkModeSlideToggle() {
    return this._darkModeSlideToggle;
  }

  @ViewChild('overlaySpinnerContainer', { read: ViewContainerRef })
  public set overlaySpinnerContainer(container: ViewContainerRef) {
    this._overlaySpinnerContainer = container;

    this.overlaySpinnerService.overlaySpinnerContainerRef = container;
  }
  public get overlaySpinnerContainer() {
    return this._overlaySpinnerContainer;
  }

  public changeThemeMode(theme: string) {
    switch (theme) {
      case 'dark':
        this.renderer.addClass(this.appContainer.nativeElement, 'darkMode');
        this.overlay.getContainerElement().classList.add('darkMode');

        this.localStorageService.theme = 'dark';
        break;
      case 'light':
        this.renderer.removeClass(this.appContainer.nativeElement, 'darkMode');
        this.overlay.getContainerElement().classList.remove('darkMode');

        this.localStorageService.theme = 'light';
        break;
      default:
        if (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) {

          this.darkModeSlideToggle.toggle();
          this.changeDetectorRef.detectChanges();

          this.renderer.addClass(this.appContainer.nativeElement, 'darkMode');
          this.overlay.getContainerElement().classList.add('darkMode');

          this.localStorageService.theme = 'dark';
        } else {
          this.localStorageService.theme = 'light';
        }
        break;
    }
  }

  /**
   * modifies transferStorage on toggle.
   * @param slideToggle event data for the vault slide toggle component.
   */
  public onVaultToggleChange(slideToggle: MatSlideToggleChange) {
    if (slideToggle.checked) {
      this.transferStorageService.transferStorage = 'vault';
    } else {
      this.transferStorageService.transferStorage = 'inventory';
    }
  }

  /**
   * toggles between light and dark themes.
   * @param slideToggle event data for the dark slide toggle component.
   */
  public onDarkModeToggleChange(slideToggle: MatSlideToggle) {
    if (slideToggle.checked) {
      this.changeThemeMode('dark');
    } else {
      this.changeThemeMode('light');
    }
  }

  ngOnDestroy() {
    this.currentMembershipService.destroyCurrentUserMembershipSub();
  }
}
