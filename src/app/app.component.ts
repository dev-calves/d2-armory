import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { 
  MatSlideToggle, 
  MatSlideToggleChange 
} from '@angular/material/slide-toggle';
import { 
  OverlaySpinnerService, 
  TransferStorageService 
} from './core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private _appContainer: ElementRef;
  private _darkModeSlideToggle: MatSlideToggle;
  private _overlaySpinnerContainer: ViewContainerRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private overlaySpinnerService: OverlaySpinnerService,
    public transferStorageService: TransferStorageService,
    private appService: AppService
    ) {

  }

  ngOnInit() {
    // set currentusermembership data of currently logged in user.
    this.appService.serviceInitialization();
  }

  ngAfterViewInit() {
    this.appService.darkModeSwitch(
      this.darkModeSlideToggle, 
      this.changeDetectorRef, 
      this.appContainer
      );
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

  /**
   * modifies transferStorage on toggle.
   * @param slideToggle event data for the vault slide toggle component.
   */
  public onVaultToggleChange(vaultSlideToggle: MatSlideToggleChange) {
    this.appService.onVaultToggleChange(vaultSlideToggle);
  }

  /**
   * toggles between light and dark themes.
   * @param slideToggle event data for the dark slide toggle component.
   */
  public onDarkModeToggleChange() {
    this.appService.onDarkModeToggleChange(
      this.darkModeSlideToggle, 
      this.changeDetectorRef, 
      this.appContainer
      );
  }
}
