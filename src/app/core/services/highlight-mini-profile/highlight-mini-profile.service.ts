import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighlightMiniProfileService {
  private _characterButtonSelected: Element;
  private _renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this._renderer = this.rendererFactory.createRenderer(null, null);
  }

  public set characterButtonSelected(selected: Element) {
    this._characterButtonSelected = selected;
  }
  public get characterButtonSelected() {
    return this._characterButtonSelected;
  }

  /**
   * highlights the selected character's mini-profile.
   */
  public addCharacterHighlight() {
    this._renderer.setStyle(this._characterButtonSelected, 'background-color', 'white');
  }

  /**
   * removes highlights from the selected character's mini-profile.
   */
  public removeCharacterHighlight() {
    if (this._characterButtonSelected) {
      this._renderer.removeStyle(this._characterButtonSelected, 'background-color');
    }
  }
}
