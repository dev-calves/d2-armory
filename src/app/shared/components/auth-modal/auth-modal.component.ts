import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  private _bungieAuthUrl: SafeUrl = null;

  constructor(private dialogRef: MatDialogRef<AuthModalComponent>, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.bungieAuthUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.page.home.BUNGIE_AUTHORIZATION_ENDPOINT + '?client_id=' + environment.page.home.BUNGIE_CLIENT_ID +
    '&response_type=' + environment.page.home.BUNGIE_AUTHORIZATION_RESPONSE_TYPE);
  }

  get bungieAuthUrl(): SafeUrl {
    return this._bungieAuthUrl;
  }

  set bungieAuthUrl(url: SafeUrl) {
    this._bungieAuthUrl = url;
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
