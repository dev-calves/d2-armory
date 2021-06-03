import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class TransferStorageService {
  private _transferStorage: string = 'inventory';

  constructor(private localStorageService: LocalStorageService) {}

  public set transferStorage(transferStorage: string) {
    if (this._transferStorage != transferStorage) {
      this._transferStorage = transferStorage;
    }

    if (this.localStorageService.transferStorage != this.transferStorage) {
      this.localStorageService.transferStorage = this.transferStorage;
    }
  }
  public get transferStorage() {
    return this._transferStorage;
  }
}
