import {
  Injectable,
  ElementRef,
  ComponentRef,
  ComponentFactoryResolver,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EquipmentService, OverlaySpinnerService } from 'src/app/core/services';
import { OutfitComponent } from 'src/app/home/components/outfit/outfit.component';
import { ICurrentUserMembership, IEquipment, IEquipmentCapture } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WardrobeService {
  private _currentUserMembership: ICurrentUserMembership;
  private _equipmentServiceSub: Subscription;
  private _equipmentServiceSubs: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar,
    private overlaySpinnerService: OverlaySpinnerService,
    private equipmentService: EquipmentService,
    private resolver: ComponentFactoryResolver) { }

  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  public initializeOutfits(
    initialOutfits,
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    transferStorage: string,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {

    for (const outfit in initialOutfits) {
      this.createOutfitComponent(
        outfitsContainer,
        outfits,
        characterId,
        wardrobeName,
        transferStorage,
        initialOutfits[outfit].outfitName,
        initialOutfits[outfit].equipment,
        outfitClickEvent);
    };

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
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    transferStorage: string,
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
          transferStorage,
          outfitClickEvent);
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
  public createNewOutfitComponent(
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    transferStorage: string,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {
    // load home page spinner.
    this.overlaySpinnerService.showOverlaySpinner();

    // send request to record currently equipped items.
    this._equipmentServiceSub = this.equipmentService.captureEquipment(
      this.currentUserMembership.membershipId,
      this.currentUserMembership.membershipType,
      characterId
    ).subscribe((captureResponse: IEquipmentCapture) => {
      const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
      const ref: ComponentRef<OutfitComponent> =
        outfitsContainer.createComponent(outfitFactory);

      ref.instance.characterId = characterId;
      ref.instance.currentUserMembership = this.currentUserMembership;
      ref.instance.wardrobeName = wardrobeName;
      ref.instance.equipment = captureResponse.equipment;
      ref.instance.transferStorage = transferStorage;
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

  public createOutfitComponent(
    outfitsContainer,
    outfits: ComponentRef<OutfitComponent>[],
    characterId: string,
    wardrobeName: string,
    transferStorage: string,
    outfitName: string,
    outfitEquipment: IEquipment,
    outfitClickEvent: EventEmitter<ComponentRef<OutfitComponent>>) {
    // send request to record currently equipped items.
    const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
    const ref: ComponentRef<OutfitComponent> =
      outfitsContainer.createComponent(outfitFactory);

    ref.instance.characterId = characterId;
    ref.instance.currentUserMembership = this.currentUserMembership;
    ref.instance.wardrobeName = wardrobeName;
    ref.instance.equipment = outfitEquipment;
    ref.instance.transferStorage = transferStorage;
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
   * remove wardrobe from localStorage.
   * @param characterId character id.
   * @param wardrobeName wardrobe name.
   */
  public deleteWardrobeLocal(characterId: string, wardrobeName: string): void {
    // parse outfits localStorage.
    let storedEquipment = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    // delete wardrobe along with it's outfits.
    delete storedEquipment[characterId][wardrobeName];

    // update outfits localStorage.
    localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
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
