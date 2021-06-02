import { Injectable } from '@angular/core';
import { ICurrentUserMembership, IEquipment, IEquipmentDawn } from 'src/app/core/models';
import { EquipmentService } from 'src/app/core/services/apis/equipment/equipment.service';
import { OverlaySpinnerService } from 'src/app/core/services//overlay-spinner';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private _equipmentServiceSub: Subscription;

  constructor(private equipmentService: EquipmentService, 
              private overlaySpinnerService: OverlaySpinnerService) { }

  /**
   * sends a request to put on equipment to the character.
   * @param equipment equipment stored to outfit.
   * @param currentUserMembership membership account info.
   * @param characterId id of the character.
   * @param transferStorage allow transfers from inventory or vaults.
   */
  public dawnEquipment( 
          equipment: IEquipment,
          currentUserMembership: ICurrentUserMembership,
          characterId: string,
          transferStorage: string): void {
    // load the home page spinner.
    this.overlaySpinnerService.showOverlaySpinner();

    // send request for equipping items.
    this._equipmentServiceSub = this.equipmentService.dawnEquipment(
      equipment, currentUserMembership.membershipType,
      currentUserMembership.membershipId, characterId, transferStorage)
      .pipe(
        // delay to give Bungie DB time to update before gear swapping again.
        delay(3000)
      ).subscribe((response: IEquipmentDawn) => {
        // unload the home page spinner.
        this.overlaySpinnerService.hideOverlaySpinner();
        // TODO: Decide how to communicate bad status messages and/or {} messages.
      });
  }

  /**
   * remove outfit equipment from localStorage.
   * @param characterId id of character.
   * @param wardrobeName name of wardrobe.
   * @param outfitName name of the outfit.
   */
  public removeCurrentEquipmentLocal(characterId: string, wardrobeName: string, outfitName: string) {
    // parse localStorage into JSON objects.
    let storedEquipment = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    // remove the specific outfit.
    delete storedEquipment[characterId][wardrobeName][outfitName];

    // stringify updated outfits and store into localStorage.
    localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
  }

  /**
   * remove old outfit name from localStorage.
   * @param characterId character id.
   * @param wardrobeName wardrobe name.
   * @param outfitName outfit name.
   */
  public removePreviousEquipmentLocal(characterId: string, wardrobeName: string, outfitName: string) {
    // parse localStorage into JSON objects.
    let storedEquipment = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    if (storedEquipment && storedEquipment[characterId] &&
      storedEquipment[characterId][wardrobeName] &&
      storedEquipment[characterId][wardrobeName][outfitName] &&
      storedEquipment[characterId][wardrobeName][outfitName].outfitName === outfitName) {
      // remove previous name.
      delete storedEquipment[characterId][wardrobeName][outfitName];

      // update outfits in localStorage.
      localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
    }
  }

  /**
   * store an outfit to localStorage.
   * @param wardrobeName wardrobe name.
   * @param characterId character id.
   * @param outfitName outfit name.
   * @param equipment equipment to be stored.
   */
  public saveEquipmentLocal(wardrobeName: string, characterId: string, outfitName: string, equipment: IEquipment) {
    // new outfit.
    const outfit = {
      wardrobeName: wardrobeName,
      outfitName: outfitName,
      equipment: equipment
    };

    let storedEquipment = {};

    // build structure for the outfits localStorage property.
    if (localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT)) {
      storedEquipment = Object.assign({}, JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT)));

      if (storedEquipment[characterId]) {
        if (storedEquipment[characterId][wardrobeName]) {
          storedEquipment[characterId][wardrobeName][outfitName] = outfit;
        } else {
          storedEquipment[characterId][wardrobeName] = {};
          storedEquipment[characterId][wardrobeName][outfitName] = outfit;
        }
      } else {
        storedEquipment[characterId] = {};
        storedEquipment[characterId][wardrobeName] = {};
        storedEquipment[characterId][wardrobeName][outfitName] = outfit;
      }
    } else {
      storedEquipment[characterId] = {};
      storedEquipment[characterId][wardrobeName] = {};
      storedEquipment[characterId][wardrobeName][outfitName] = outfit;
    }

    // store the outfits to localStorage.
    localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
  }

  public destroy(){
    if(this._equipmentServiceSub) { this._equipmentServiceSub.unsubscribe(); }
  }
}

