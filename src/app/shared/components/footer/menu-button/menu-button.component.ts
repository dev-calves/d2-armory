import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {
  private _toggleSelected: string = "vault";

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(value: string): void {
    this.toggleSelected = value;
  }

  get toggleSelected(): string {
    return this._toggleSelected;
  }

  set toggleSelected(vault: string) {
    this._toggleSelected = vault;
  }
}
