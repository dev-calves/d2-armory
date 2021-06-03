import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferStorageService {
  private _transferStorage: string = 'inventory';

  constructor() {}

  public set transferStorage(transferStorage: string) {
    if (this._transferStorage != transferStorage) {
      this._transferStorage = transferStorage;
    }
    // TODO: remove this storage prop. after implementing DB.
    if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) != this.transferStorage) {
      localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, transferStorage);
    }
  }
  public get transferStorage() {
    return this._transferStorage;
  }
}
