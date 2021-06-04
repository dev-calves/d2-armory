import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { 
  MatSlideToggle, 
  MatSlideToggleChange 
} from '@angular/material/slide-toggle';
import {
  CurrentMembershipService,
  LocalStorageService,
  TransferStorageService
} from './core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _renderer: Renderer2;

  constructor(
    private transferStorageService: TransferStorageService,
    private localStorageService: LocalStorageService,
    private currentMembershipService: CurrentMembershipService,
    private overlay: OverlayContainer,
    private rendererFactory: RendererFactory2
  ) {
    this._renderer = this.rendererFactory.createRenderer(null, null);
  }

  public setLocalTransferStorage(vaultSlideToggle: MatSlideToggle) {
    if (this.localStorageService.transferStorage != undefined && vaultSlideToggle.checked) {
      this.localStorageService.transferStorage = 'vault';
    } else {
      this.localStorageService.transferStorage = 'inventory';
    }
  }

  /**
   * initializes the transferStorageService
   * and the currentMembershipService.
   */
  public serviceInitialization() {
    // init transferStorageService.
    this.transferStorageService.transferStorage =
      this.localStorageService.transferStorage;

    // init currentusermembershipservice with currently logged in user's info.
    this.currentMembershipService.userProfile();
  }

  /**
   * Checks to see if the dark theme is set in localstorage or in the system,
   * then switches the theme to darkmode if so.
   * @param darkModeSlideToggle darkmode slider button toggle
   * @param changeDetectorRef appComponent changedetectoref
   * @param appContainer contains the entire app components
   */
  public darkModeSwitch(
    darkModeSlideToggle: MatSlideToggle,
    changeDetectorRef: ChangeDetectorRef,
    appContainer: ElementRef
  ) {
    if (this.localStorageService.isDarkMode()) {
      this.changeThemeMode('dark', darkModeSlideToggle, changeDetectorRef, appContainer);
      darkModeSlideToggle.toggle();
      changeDetectorRef.detectChanges();
    } else if (!this.localStorageService.theme) {
      this.changeThemeMode('', darkModeSlideToggle, changeDetectorRef, appContainer);
    }
  }

  /**
   * switches themes between light and dark
   * @param theme 'light' || 'dark'
   * @param darkModeSlideToggle darkmode slider button toggle
   * @param changeDetectorRef appComponent changedetectoref
   * @param appContainer contains the entire app components
   */
  private changeThemeMode(
    theme: string,
    darkModeSlideToggle: MatSlideToggle,
    changeDetectorRef: ChangeDetectorRef,
    appContainer: ElementRef
  ) {
    switch (theme) {
      case 'dark':
        this._renderer.addClass(appContainer.nativeElement, 'darkMode');
        this.overlay.getContainerElement().classList.add('darkMode');

        this.localStorageService.theme = 'dark';
        break;
      case 'light':
        this._renderer.removeClass(appContainer.nativeElement, 'darkMode');
        this.overlay.getContainerElement().classList.remove('darkMode');

        this.localStorageService.theme = 'light';
        break;
      default:
        if (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) {

          darkModeSlideToggle.toggle();
          changeDetectorRef.detectChanges();

          this._renderer.addClass(appContainer.nativeElement, 'darkMode');
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
   * @param vaultSlideToggle event data for the vault slide toggle component.
   */
  public onVaultToggleChange(vaultSlideToggleChange: MatSlideToggleChange) {
    if (vaultSlideToggleChange.checked) {
      this.transferStorageService.transferStorage = 'vault';
    } else {
      this.transferStorageService.transferStorage = 'inventory';
    }
  }

  /**
   * toggles between light and dark themes.
   * @param darkModeSlideToggle darkmode slider button toggle
   * @param changeDetectorRef appComponent changedetectoref
   * @param appContainer contains the entire app components
   */
  public onDarkModeToggleChange(
    // slideToggle: MatSlideToggle,
    darkModeSlideToggle: MatSlideToggle,
    changeDetectorRef: ChangeDetectorRef,
    appContainer: ElementRef
    ) {
    if (darkModeSlideToggle.checked) {
      this.changeThemeMode('dark', darkModeSlideToggle, changeDetectorRef, appContainer);
    } else {
      this.changeThemeMode('light', darkModeSlideToggle, changeDetectorRef, appContainer);
    }
  }

  public destroyCurrentMembershipSub() {
    this.currentMembershipService.destroyCurrentUserMembershipSub();
  }
}
