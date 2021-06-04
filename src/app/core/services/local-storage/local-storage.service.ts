import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IEquipment } from '../../models';
import { CurrentMembershipService } from '../current-membership';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private currentMembershipService: CurrentMembershipService
  ) { }

  public set transferStorage(storage: string) {
    localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, storage);
  }
  public get transferStorage() {
    return localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) || 'inventory';
  }

  public set theme(theme: string) {
    localStorage.setItem('theme', theme);
  }
  public get theme() {
    return localStorage.getItem('theme');
  }

  public set state(state: string) {
    if (state) {
      localStorage.setItem(environment.LOCAL_STORAGE_STATE, state);
    } else {
      localStorage.removeItem(environment.LOCAL_STORAGE_STATE);
    }
  }
  public get state() {
    return localStorage.getItem(environment.LOCAL_STORAGE_STATE);
  }

  public set dismissLogonMessage(dismiss: string) {
    localStorage.setItem(environment.LOCAL_STORAGE_DISMISS_LOGON_MESSAGE, dismiss);
  }
  public get dismissLogonMessage() {
    return localStorage.getItem(environment.LOCAL_STORAGE_DISMISS_LOGON_MESSAGE);
  }

  /**
   * checks for dark theme in localstorage
   * @returns boolean
   */
  public isDarkMode() {
    return (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark');
  }

  /**
   * returns the wardrobes stored in localstorage.
   * @param characterId 
   * @returns object containing wardrobes tied to a character id
   */
  public getInitialWardrobes(characterId: string) {
    let storedCharacterOutfits = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    if (storedCharacterOutfits &&
      storedCharacterOutfits[this.currentMembershipService.displayName] &&
      storedCharacterOutfits[this.currentMembershipService.displayName][characterId] &&
      Object.keys(storedCharacterOutfits[this.currentMembershipService.displayName][characterId]).length > 0) {
      return storedCharacterOutfits[this.currentMembershipService.displayName][characterId];
    } else {
      return {};
    }
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

    if (
      storedEquipment &&
      storedEquipment[this.currentMembershipService.displayName] &&
      storedEquipment[this.currentMembershipService.displayName][characterId] &&
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] &&
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName]) {
      // remove the specific outfit.
      delete storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName];

      // stringify updated outfits and store into localStorage.
      localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
    }
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

    if (
      storedEquipment &&
      storedEquipment[this.currentMembershipService.displayName] &&
      storedEquipment[this.currentMembershipService.displayName][characterId] &&
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] &&
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] &&
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName].outfitName === outfitName) {
      // remove previous name.
      delete storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName];

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

    let storedEquipment = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    // build structure for the outfits localStorage property.
    if (storedEquipment) {
      if (storedEquipment[this.currentMembershipService.displayName]) {
        if (storedEquipment[this.currentMembershipService.displayName][characterId]) {
          if (storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName]) {
            storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] = outfit;
          } else {
            storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] = {};
            storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] = outfit;
          }
        } else {
          storedEquipment[this.currentMembershipService.displayName][characterId] = {};
          storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] = {};
          storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] = outfit;
        }
      } else {
        storedEquipment[this.currentMembershipService.displayName] = {};
        storedEquipment[this.currentMembershipService.displayName][characterId] = {};
        storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] = {};
        storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] = outfit;
      }
    } else {
      storedEquipment = {};
      storedEquipment[this.currentMembershipService.displayName] = {};
      storedEquipment[this.currentMembershipService.displayName][characterId] = {};
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName] = {};
      storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName][outfitName] = outfit;
    }

    // store the outfits to localStorage.
    localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
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
    delete storedEquipment[this.currentMembershipService.displayName][characterId][wardrobeName];

    // update outfits localStorage.
    localStorage.setItem(environment.LOCAL_STORAGE_EQUIPMENT, JSON.stringify(storedEquipment));
  }

}
