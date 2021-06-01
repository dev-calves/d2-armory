import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-menu-buttons',
  templateUrl: './home-menu-buttons.component.html',
  styleUrls: ['./home-menu-buttons.component.css']
})
export class HomeMenuButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() homeClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * sends menu click event to the home component.
   */
  public onMenuClick(): void {
    this.menuClick.emit();
  }

  /**
   * sends home click event to the home component.
   */
  public onHomeClick(): void {
    this.homeClick.emit();
  }

}
