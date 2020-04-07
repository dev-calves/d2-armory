import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {
  private _bungieAuthUrl: string =
    environment.BUNGIE_AUTHORIZATION_ENDPOINT + '?client_id=' + environment.BUNGIE_CLIENT_ID +
    '&response_type=' + environment.BUNGIE_AUTHORIZATION_RESPONSE_TYPE;

  constructor(private dialogRef: MatDialogRef<AuthModalComponent>) { }

  get bungieAuthUrl(): string {
    return this._bungieAuthUrl;
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
