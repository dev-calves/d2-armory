import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {

  constructor(private dialogRef: MatDialogRef<AuthModalComponent>) { }

  onClick(): void {
    this.dialogRef.close();
  }

}
