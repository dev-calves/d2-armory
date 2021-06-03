import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';

import { environment } from 'src/environments/environment';
import { DialogData, LocalStorageService } from 'src/app/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  private _dismissCheckBox: MatCheckbox;
  private _authContainer: ElementRef

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: DialogData,
   private dialogRef: MatDialogRef<AuthModalComponent>,
   public localStorageService: LocalStorageService
   ) { }

  ngOnInit(): void {}

  @ViewChild('dismissCheckbox')
  public set dismissCheckBox(element: MatCheckbox) {
    this._dismissCheckBox = element;
  }
  public get dismissCheckBox() {
    return this._dismissCheckBox;
  }

  @ViewChild('authContainer')
  public set authContainer(element: ElementRef) {
    this._authContainer = element;
  }
  public get authContainer() {
    return this._authContainer;
  }

  /**
   * stores state into localStorage for future comparison.
   */
  public logOnClick(): void {
    // write or overwrite existing state item.
    localStorage.setItem(environment.LOCAL_STORAGE_STATE, this.data.stateHex);
    localStorage.setItem(environment.LOCAL_STORAGE_DISMISS_LOGON_MESSAGE, JSON.stringify(this.dismissCheckBox.checked));
  }

  /**
   * close dialog box.
   */
  public closeClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {}

}
