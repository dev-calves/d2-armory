import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {

  constructor(public dialogRef: MatDialogRef<AuthModalComponent>) { }

  onClick(): void {
    this.dialogRef?.close();
  }

}
