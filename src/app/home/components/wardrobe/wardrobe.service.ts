import {
  Injectable,
  ElementRef,
  ComponentRef,
  ComponentFactoryResolver,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEquipment, IEquipmentCapture } from 'src/app/core/models';
import { CurrentMembershipService, EquipmentService, OverlaySpinnerService } from 'src/app/core/services';
import { OutfitComponent } from 'src/app/home/components/outfit/outfit.component';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private _equipmentServiceSub: Subscription;
  private _equipmentServiceSubs: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar,
    private overlaySpinnerService: OverlaySpinnerService,
    private equipmentService: EquipmentService,
    private resolver: ComponentFactoryResolver,
    private currentMembershipService: CurrentMembershipService
    ) { }

  public initializeOutfits(
    initialOutfits,
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {

    for (const outfit in initialOutfits) {
      this.createOutfitComponent(
        outfitsContainer,
        outfits,
        characterId,
        wardrobeName,
        initialOutfits[outfit].outfitName,
        initialOutfits[outfit].equipment,
        outfitClickEvent);
    };

  }

  /**
   * add an outfit button if the max is not reached.
   * @param elementRef wardrobe elementRef.
   * @param outfitsContainer outfits container.
   * @param outfits list of outfits in the wardrobe.
   * @param characterId character id.
   * @param wardrobeName wardrobe name
   * @param outfitClickEvent outfitClick event to be manipulated by character component.
   */
  public addOutfit(
    elementRef: ElementRef,
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {
    const outfitError: HTMLElement = elementRef.nativeElement.querySelector('mat-error');

    // check if the wardrobe name is proper.
    if (outfitError) {
      this.openSnackBar(outfitError.innerHTML);
    } else {
      // max outfits are 10.
      if (outfits.length < 10) {
        this.createNewOutfitComponent(
          outfitsContainer,
          outfits,
          characterId,
          wardrobeName,
          outfitClickEvent);
      } else {
        this.openSnackBar('Max outfits reached');
      }
    }
  }

  /**
   * creates a new outfit component.
   * @param outfitsContainer outfits container.
   * @param outfits list of outfits in the wardrobe.
   * @param characterId character id.
   * @param wardrobeName wardrobe name.
   * @param outfitClickEvent outfit click event.
   */
  public createNewOutfitComponent(
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {
    // load home page spinner.
    this.overlaySpinnerService.showOverlaySpinner();

    // send request to record currently equipped items.
    this._equipmentServiceSub = this.equipmentService.captureEquipment(
      this.currentMembershipService.membershipId,
      this.currentMembershipService.membershipType,
      characterId
    ).subscribe((captureResponse: IEquipmentCapture) => {
      const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
      const ref: ComponentRef<OutfitComponent> =
        outfitsContainer.createComponent(outfitFactory);

      ref.instance.characterId = characterId;
      ref.instance.wardrobeName = wardrobeName;
      ref.instance.equipment = captureResponse.equipment;
      ref.instance.outfitClickEvent.subscribe(() => {
        outfitClickEvent.emit(ref);
      });


      // add ref to list of managed refs. will also need to be destroyed.
      outfits.push(ref);

      // move the outfit to the left-most position.
      outfitsContainer.move(ref.hostView, 0);

      // remove spinner from home page.
      this.overlaySpinnerService.hideOverlaySpinner();
      
      // send event to have this be a selected component.
      outfitClickEvent.emit(ref);
    });

    this._equipmentServiceSubs.push(this._equipmentServiceSub);
  }

  /**
   * creates outfits that were saved previously.
   * @param outfitsContainer outfit container.
   * @param outfits list of outfits in the wardrobe.
   * @param characterId character id.
   * @param wardrobeName wardrobe name.
   * @param outfitName outfit name.
   * @param outfitEquipment outfit equipment.
   * @param outfitClickEvent outfit click event.
   */
  public createOutfitComponent(
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    outfitName: string,
    outfitEquipment: IEquipment,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {
    // send request to record currently equipped items.
    const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
    const ref: ComponentRef<OutfitComponent> =
      outfitsContainer.createComponent(outfitFactory);

    ref.instance.characterId = characterId;
    ref.instance.wardrobeName = wardrobeName;
    ref.instance.equipment = outfitEquipment;
    ref.instance.outfitName = outfitName;
    ref.instance.outfitClickEvent.subscribe(() => {
      outfitClickEvent.emit(ref);
    });

    // add ref to list to be destroyed.
    outfits.push(ref);

    // move the outfit to the left-most position.
    outfitsContainer.move(ref.hostView, 0);
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
    this._equipmentServiceSubs.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
