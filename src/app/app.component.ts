import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LocalStorageService, OverlaySpinnerService, TransferStorageService } from './core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private _appContainer: ElementRef;
  private _darkModeSlideToggle: MatSlideToggle;
  private _overlaySpinnerContainer: ViewContainerRef;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private overlaySpinnerService: OverlaySpinnerService,
    public transferStorageService: TransferStorageService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    // set the storage localStorage property.
    this.transferStorageService.transferStorage = localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) || 'inventory';
  }

  ngAfterViewInit() {
    if (this.localStorageService.isDarkMode()) {
      this.changeThemeMode('dark');
      this.darkModeSlideToggle.toggle();
      this.changeDetectorRef.detectChanges();
    } else if (!localStorage.getItem('theme')) {
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
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        this.renderer.removeClass(this.appContainer.nativeElement, 'darkMode');
        localStorage.setItem('theme', 'light');
        break;
      default:
        if (window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) {

          this.darkModeSlideToggle.toggle();
          this.changeDetectorRef.detectChanges();

          this.renderer.addClass(this.appContainer.nativeElement, 'darkMode');

          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
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
}
