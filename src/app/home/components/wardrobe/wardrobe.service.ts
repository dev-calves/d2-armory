import { 
  Injectable, 
  ElementRef, 
  Renderer2, 
  RendererFactory2, 
  Inject, 
  ComponentRef, 
  ComponentFactoryResolver ,
  ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EquipmentService, OverlaySpinnerService } from 'src/app/core/services';
import { OutfitComponent } from 'src/app/home/components/outfit/outfit.component';
import { ICurrentUserMembership, IEquipmentCapture } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private _renderer: Renderer2;

  private _outfitsContainer: ViewContainerRef;
  private _outfitComponentRef: ComponentRef<OutfitComponent>[] = [];
  private _equipmentServiceSub: Subscription;
  private _equipmentServiceSubs: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private overlaySpinnerService: OverlaySpinnerService,
    private equipmentService: EquipmentService,
    private resolver: ComponentFactoryResolver) {
    this._renderer = this.rendererFactory.createRenderer(null, null);
  }

  public set outfitsContainer(container: ViewContainerRef) {
    this._outfitsContainer = container;
  }
  public get outfitsContainer() {
    return this._outfitsContainer;
  }
  
  /**
   * add an outfit button if the max is not reached.
   * @param elementRef wardrobe elementRef.
   * @param outfits list of outfits in the wardrobe.
   * @param currentUserMembership account info.
   * @param characterId character id.
   * @param formControlValue name typed into form.
   * @param transferStorage allow inventory or vault transfers.
   */
  public addOutfit(
    elementRef: ElementRef, 
    outfits: HTMLCollection,
    currentUserMembership: ICurrentUserMembership,
    characterId: string,
    formControlValue: string,
    transferStorage: string) {
    const outfitError: HTMLElement = elementRef.nativeElement.querySelector('mat-error');

    // check if the wardrobe name is proper.
    if (outfitError) {
      this.openSnackBar(outfitError.innerHTML);
    } else {
      let outfitCounter = 0;

      // to ignore hidden outfit components.
      Array.from(outfits).forEach(element => {
        if (element?.children?.length > 0) {
          outfitCounter++;
        }
      });

      // max outfits are 10.
      if (outfitCounter < 10) {
        this.createOutfitComponent(
          currentUserMembership, 
          characterId, 
          formControlValue, 
          transferStorage);
      } else {
        this.openSnackBar('Max outfits reached');
      }
    }
  }

  /**
   * creates an outfit component.
   * @param currentUserMembership account info.
   * @param characterId character id.
   * @param formControlValue form value.
   * @param transferStorage allowable storage transfer type.
   */
  public createOutfitComponent(
    currentUserMembership: ICurrentUserMembership,
    characterId: string,
    formControlValue: string,
    transferStorage: string) {
      // load home page spinner.
      this.overlaySpinnerService.showOverlaySpinner();

      // send request to record currently equipped items.
      this._equipmentServiceSub = this.equipmentService.captureEquipment(
        currentUserMembership.membershipId,
        currentUserMembership.membershipType,
        characterId
      ).subscribe((captureResponse: IEquipmentCapture) => {
        const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
        const ref: ComponentRef<OutfitComponent> =
          this.outfitsContainer.createComponent(outfitFactory);

        ref.instance.characterId = characterId;
        ref.instance.currentUserMembership = currentUserMembership;
        ref.instance.wardrobeName = formControlValue;
        ref.instance.equipment = captureResponse.equipment;
        ref.instance.transferStorage = transferStorage;
        ref.instance.toggleHighlightsEvent.subscribe(outfitElement => {
          ref.changeDetectorRef.detectChanges();
          this.toggleHighlights(outfitElement);
        });
        this._equipmentServiceSubs.push(this._equipmentServiceSub);

        // add ref to list to be destroyed.
        this._outfitComponentRef.push(ref);

        // move the outfit to the left-most position.
        this.outfitsContainer.move(ref.hostView, 0);

        // highlight new button as the outfit in use.
        ref.changeDetectorRef.detectChanges();
        this.toggleHighlights(ref.instance.elementRef);

        // remove spinner from home page.
        this.overlaySpinnerService.hideOverlaySpinner();
      });
  }

  /**
   * removes highlighting from all outfits then highlight the given outfit.
   * @param elementRef wardrobe elementRef.
   */
  public toggleHighlights(elementRef: ElementRef) {
    let characterOutfits = this.document.querySelectorAll('app-outfit');

    // remove highlighting from outfits.
    Array.from(characterOutfits).forEach((element: HTMLElement) => {
      if (element.children.length > 0) { // ignore the container div
        this._renderer.removeStyle(element.firstChild, 'background-color');
        this._renderer.removeStyle(element.firstChild, 'color');
      }
    });

    // highlight current outfit.
    this._renderer.setStyle(elementRef.nativeElement.firstChild, 'background-color', 'grey');
    this._renderer.setStyle(elementRef.nativeElement.firstChild, 'color', 'black');
  }

  /**
   * remove wardrobe from localStorage.
   * @param characterId character id.
   * @param wardrobeName wardrobe name.
   */
  public deleteWardrobeLocal(characterId: string, wardrobeName: string): void {
    // parse outfits localStorage.
    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));

    // delete wardrobe along with it's outfits.
    delete storedOutfits[characterId][wardrobeName];

    // update outfits localStorage.
    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
  }

  /**
   * send messages to the user.
   * @param message message to display to user.
   */
  public openSnackBar(message: string): void {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  /**
   * destroy refs and subscriptions
   */
  public destroy() {
    // if (this._outfitComponentRef.length > 0) {
      this._outfitComponentRef.forEach((ref: ComponentRef<OutfitComponent>) => {
        ref.destroy();
      });
    // }
    this._equipmentServiceSubs.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
