import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IEquipmentCapture, IEquipmentDawn, Equipment } from '../../../models/api';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private _http: HttpClient) { }

  public captureEquipment(membershipId: string, membershipType: number, characterId: string): Observable<IEquipmentCapture> {
    return this._http.get<IEquipmentCapture>(`${environment.EQUIPMENT_ENDPOINT}/capture?membershipId=${membershipId}&membershipType=${membershipType}&characterId=${characterId}`);
  }

  public dawnEquipment(equipment: Equipment, membershipType: number, membershipId: string, characterId: string, transferLocation: string): Observable<IEquipmentDawn> {
    return this._http.post<IEquipmentDawn>(`${environment.EQUIPMENT_ENDPOINT}/dawn`, {
      "equipment": equipment,
      "membershipType": membershipType,
      "membershipId": membershipId,
      "characterId": characterId,
      "transferLocation": transferLocation
    });
  }
}
