import { Injectable } from '@angular/core';
import { IEquipment, IEquipmentDawn } from 'src/app/core/models';
import { EquipmentService } from 'src/app/core/services/apis/equipment/equipment.service';
import { OverlaySpinnerService } from 'src/app/core/services//overlay-spinner';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CurrentMembershipService, TransferStorageService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private _equipmentServiceSub: Subscription;

  constructor(private equipmentService: EquipmentService, 
              private overlaySpinnerService: OverlaySpinnerService,
              private currentMembershipService: CurrentMembershipService,
              private transferStorageService: TransferStorageService
              ) { }

  /**
   * sends a request to put on equipment to the character.
   * @param equipment equipment stored to outfit.
   * @param characterId id of the character.
   */
  public dawnEquipment( 
          equipment: IEquipment,
          characterId: string,
          ): void {
    // load the home page spinner.
    this.overlaySpinnerService.showOverlaySpinner();

    // send request for equipping items.
    this._equipmentServiceSub = this.equipmentService.dawnEquipment(
      equipment, this.currentMembershipService.membershipType,
      this.currentMembershipService.currentUserMembership.membershipId, 
      characterId, this.transferStorageService.transferStorage
      ).pipe(
        // delay to give Bungie DB time to update before gear swapping again.
        delay(3000)
      ).subscribe((response: IEquipmentDawn) => {
        // unload the home page spinner.
        this.overlaySpinnerService.hideOverlaySpinner();
        // TODO: Decide how to communicate bad status messages and/or {} messages.
      });
  }

  public destroy(){
    if(this._equipmentServiceSub) { this._equipmentServiceSub.unsubscribe(); }
  }
}

