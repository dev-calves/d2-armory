import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AuthModalComponent } from '../../auth-modal/auth-modal.component';

@Component({
  selector: 'app-log-in-out-button',
  templateUrl: './log-in-out-button.component.html',
  styleUrls: ['./log-in-out-button.component.css']
})
export class LogInOutButtonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    this.dialog.open(AuthModalComponent, {
      width: '400px'
    });
  }
}
