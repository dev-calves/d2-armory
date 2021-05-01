import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {
  private _transferStorage: string = '';

  constructor() { }

  ngOnInit() { }

  @Output() menuToggleClickEvent: EventEmitter<any> = new EventEmitter<string>();

  public onMenuToggleClick(value: 'vault' | 'inventory'): void {
    this.transferStorage = value;

    this.menuToggleClickEvent.emit(value);
  }

  @Input()
  set transferStorage(transferStorage: string) {
    this._transferStorage = transferStorage;
  }

  get transferStorage(): string {
    return this._transferStorage;
  }
}
