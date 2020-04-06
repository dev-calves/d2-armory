import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  public openDialog(): void {
    this.dialog.open(AuthModalComponent, {
      width: '400px'
    });
  }

}
