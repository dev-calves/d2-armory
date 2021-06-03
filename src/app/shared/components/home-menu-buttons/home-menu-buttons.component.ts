import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeClickService } from 'src/app/core';

@Component({
  selector: 'app-home-menu-buttons',
  templateUrl: './home-menu-buttons.component.html',
  styleUrls: ['./home-menu-buttons.component.css']
})
export class HomeMenuButtonsComponent implements OnInit {

  constructor(public homeClickService: HomeClickService) { }

  ngOnInit(): void {
  }

  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * sends menu click event to the home component.
   */
  public onMenuClick(): void {
    this.menuClick.emit();
  }
}
