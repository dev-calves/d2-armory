import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.css']
})
export class OverlaySpinnerComponent implements OnInit {
  private _showSpinner: boolean;

  constructor() { }

  ngOnInit(): void { }

  public set showSpinner(showSpinner: boolean) {
    this._showSpinner = showSpinner;
  }
  public get showSpinner() {
    return this._showSpinner;
  }

}
