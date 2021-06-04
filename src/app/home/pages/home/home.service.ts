import {
  Injectable,
  ViewContainerRef,
  ViewRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';

import { CharacterComponent } from 'src/app/home/components/character/character.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private _charactersContainer: ViewContainerRef;
  private _cachedComponents: Map<string, ViewRef> = new Map<string, ViewRef>();

  constructor(
    private resolver: ComponentFactoryResolver) { }

  public set charactersContainer(container: ViewContainerRef) {
    this._charactersContainer = container;
  }
  public get charactersContainer() {
    return this._charactersContainer;
  }

  /**
   * chooses which character tab to display when a miniprofile is clicked on.
   * @param characterId character id.
   */
  public onMiniProfileClick(
    characterId: string
    ): void {
    // clear character view.
    if (this.charactersContainer) {
      this.charactersContainer.detach();
    }

    if (characterId) {
      if (this._cachedComponents.get(characterId)) {
        // retrieve view from cache for existing view.
        this.charactersContainer.insert(this._cachedComponents.get(characterId));
      } else {
        // create the character view.
        const characterFactory = this.resolver.resolveComponentFactory(CharacterComponent);
        const ref: ComponentRef<CharacterComponent> = this.charactersContainer.createComponent(characterFactory);

        ref.instance.characterId = characterId;

        // store view in cache.
        this._cachedComponents.set(characterId, this.charactersContainer.get(0));
      }
    }
  }

  /**
   * destroy refs
   */
  public destroy() {
    this._cachedComponents.forEach((viewRef: ViewRef) => {
      viewRef.destroy();
    });
  }
}
