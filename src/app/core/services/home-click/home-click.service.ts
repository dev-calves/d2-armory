import { Injectable, ViewContainerRef } from '@angular/core';
import { HighlightMiniProfileService } from '../highlight-mini-profile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeClickService {
  private _charactersContainer: ViewContainerRef;

  constructor(private router: Router, private highlightService: HighlightMiniProfileService) { }

  public set charactersContainer(container: ViewContainerRef) {
    this._charactersContainer = container;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  /**
   * TODO: modify onHomeClick to route to home.
   * If new pages are planned to be developed,
   * modify the onHomeClick to route to the home page and
   * not remove charachter highlights.
   * modify the mini-profile onClick method:
   *  1st click: attach the character mini-profile view to home.
   *  2nd click: detach the character mini-profile view from home,
   *    instead of the onHomeClick doing it.
   */

  public onHomeClick() {
    // clear character view.
    if (this.charactersContainer?.length > 0) {
      this.highlightService.removeCharacterHighlight();

      this.charactersContainer.detach();
    } else {
      this.router.navigate(['home']);
    }
  };
}
