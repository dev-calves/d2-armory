import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IEquipmentCapture, IEquipmentDawn } from '../../../models/api';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(private _http: HttpClient) { }

  public captureEquipment(membershipId: string, membershipType: number, characterId: number): Observable<IEquipmentCapture> {
    return this._http.get<IEquipmentCapture>(`${environment.EQUIPMENT_ENDPOINT}/capture?membershipId=${membershipId}&membershipType=${membershipType}&characterId=${characterId}`);
  }

  public dawnEquipment(itemIds: number[], membershipType: number, characterId: number): Observable<IEquipmentDawn> {
    return this._http.post<IEquipmentDawn>(`${environment.EQUIPMENT_ENDPOINT}/dawn`, {
      "itemIds": itemIds,
      "membershipType": membershipType,
      "characterId": characterId
    });
  }
}
