import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {
  private _toggleSelected: "vault" | "inventory" = "vault";

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) &&
      (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'vault' ||
        localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'inventory')) {
      this.toggleSelected = (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) as "vault" | "inventory");
    } else {
      localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, this.toggleSelected)
    }
  }

  public onClick(value: "vault" | "inventory"): void {
    this.toggleSelected = value;
    localStorage.setItem(environment.LOCAL_STORAGE_STORAGE, value);

  }

  get toggleSelected(): "vault" | "inventory" {
    return this._toggleSelected;
  }

  set toggleSelected(vault: "vault" | "inventory") {
    this._toggleSelected = vault;
  }
}
