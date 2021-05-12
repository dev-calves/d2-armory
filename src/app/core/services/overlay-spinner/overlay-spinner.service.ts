import { Injectable, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { OverlaySpinnerComponent } from 'src/app/shared/components/overlay-spinner/overlay-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {
  private _overlaySpinnerContainerRef: ViewContainerRef;
  private _overlaySpinnerComponentRef: ComponentRef<OverlaySpinnerComponent>;

  constructor(private resolver: ComponentFactoryResolver) { }

  /**
   * HomeComponent will initialize the containerRef,
   * the overlaySpinnerComponent will then be created.
   */
  set overlaySpinnerContainerRef(overlaySpinnerContainerRef: ViewContainerRef) {
    this._overlaySpinnerContainerRef = overlaySpinnerContainerRef;
    this.createOverlaySpinnerComponent();
  }
  get overlaySpinnerContainerRef() {
    return this._overlaySpinnerContainerRef;
  }

  /**
   * creates the overlay spinner component to be placed onto the HomeComponent template.
   */
  public createOverlaySpinnerComponent(): void {
    const overlaySpinnerComponentFactory = 
      this.resolver.resolveComponentFactory(OverlaySpinnerComponent);

    const ref: ComponentRef<OverlaySpinnerComponent> = 
      this.overlaySpinnerContainerRef.createComponent(overlaySpinnerComponentFactory);

    this._overlaySpinnerComponentRef = ref;
  }

  /**
   * displays the spinner.
   */
  public showOverlaySpinner(): void {
    this._overlaySpinnerComponentRef.instance.showSpinner = true;
  }

  /**
   * removes the spinner.
   */
  public hideOverlaySpinner(): void {
    this._overlaySpinnerComponentRef.instance.showSpinner = false;
  }
}
