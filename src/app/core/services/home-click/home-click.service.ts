import { Injectable, ViewContainerRef } from '@angular/core';
import { HighlightMiniProfileService } from '../highlight-mini-profile';

@Injectable({
  providedIn: 'root'
})
export class HomeClickService {
  private _charactersContainer: ViewContainerRef;

  constructor(private highlightService: HighlightMiniProfileService) { }

  public set charactersContainer(container: ViewContainerRef) {
    this._charactersContainer = container;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  public onHomeClick() {
    // clear character view.
    if (this.charactersContainer) {
      this.highlightService.removeCharacterHighlight();

      this.charactersContainer.detach();
    }
  };
}
