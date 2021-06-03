import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IEquipment } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public isDarkMode() {
    return (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark');
  }

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

  public getInitialWardrobes(characterId: string) {
    let storedCharacterOutfits = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    if (storedCharacterOutfits &&
      storedCharacterOutfits[characterId] &&
      Object.keys(storedCharacterOutfits[characterId]).length > 0) {
      return storedCharacterOutfits[characterId];
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
  
}
