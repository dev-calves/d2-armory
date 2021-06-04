import { 
  Component, 
  OnInit, 
  Output, 
  EventEmitter, 
  HostListener 
} from '@angular/core';

import { 
  LoggedInService, 
  CurrentMembershipService, 
  HomeClickService
} from 'src/app/core/services';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _showDisplayName: boolean = true;

  constructor(
    public loggedInService: LoggedInService,
    public currentMembershipService: CurrentMembershipService,
    private homeClickService: HomeClickService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    // hide display name when the screen is small.
    if (window.innerWidth < 480) {
      this.showDisplayName = false;
    }
  }

  @Output() menuClick: EventEmitter<any> = new EventEmitter<any>();

  public set showDisplayName(showDisplayName: boolean) {
    this._showDisplayName = showDisplayName;
  }
  public get showDisplayName() {
    return this._showDisplayName;
  }

  /**
   * sends user to bungie for authentication.
   */
  public logOnClick(): void {
    this.headerService.logOnClick();
  }

  /**
   * Log out user by deleting tokens and refreshing home page.
   */
  public logOutClick(): void {
    this.headerService.logOutClick();
  }

  /**
   * sends click event to home component.
   */
  public onMenuClick(): void {
    this.headerService.onMenuClick(this.menuClick);
  }

  /**
   * sends click event to home component.
   */
  public onHomeClick(): void {
    this.homeClickService.onHomeClick();
  }

  /**
   * decide to show display name based on window size for all devices.
   * @param event ignored.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 480) {
      this.showDisplayName = false;
    } else if (window.innerWidth > 480) {
      this.showDisplayName = true;
    }
  }

  ngOnDestroy() {
    this.headerService.destroyOauthEncryptSub();
  }
}
