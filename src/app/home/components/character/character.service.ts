import { Injectable, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CharacterComponent } from 'src/app/home/components/character/character.component';
import { WardrobeComponent } from 'src/app/home/components/wardrobe/wardrobe.component';
import { OutfitComponent } from 'src/app/home/components/outfit/outfit.component';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private _snackBar: MatSnackBar, private resolver: ComponentFactoryResolver) { }

  /**
   * creates a wardrobe upon button click.
   * @param characterId character id.
   * @param currentUserMembership user account info.
   */
  public addWardrobe(characterComponent: CharacterComponent) {
    const wardrobeError: HTMLElement = 
      characterComponent.wardrobeParentContainer.nativeElement.querySelector('mat-error');

    // creates a wardrobe if the form is filled properly.
    if (wardrobeError) {
      this.openSnackBar(wardrobeError.innerHTML);
    } else {
      this.createNewWardrobeComponent(characterComponent);
    }
  }

  /**
   * creates wardrobes and stores them to be destroyed later.
   * @param characterComponent character component object.
   */
  public createNewWardrobeComponent(characterComponent: CharacterComponent) {
    if (characterComponent.wardrobes.length < 7) { // limit is 7 wardrobe components.
      const wardrobeFactory = this.resolver.resolveComponentFactory(WardrobeComponent);
      const ref: ComponentRef<WardrobeComponent> = 
        characterComponent.wardrobesContainer.createComponent(wardrobeFactory);
      ref.instance.characterId = characterComponent.characterId;
      ref.instance.outfitClickEvent.subscribe((outfitRef: ComponentRef<OutfitComponent>) => {
        if (characterComponent.selectedOutfit) {
          characterComponent.selectedOutfit.instance.color = '';
        }
        outfitRef.instance.color = 'accent';
        characterComponent.selectedOutfit = outfitRef;
      });

      // place new wardrobes at the top of the page.
      characterComponent.wardrobesContainer.move(ref.hostView, 0);
      ref.changeDetectorRef.detectChanges();

      // store refs for destruction.
      characterComponent.wardrobes.push(ref);
    } else {
      this.openSnackBar('Max wardrobes reached');
    }
  }

  /**
   * creates wardrobe components for each saved wardrobe.
   * @param characterComponent characterComponent character component object.
   */
  public initializeWardrobes(characterComponent: CharacterComponent) { 
    for (const wardrobeName in characterComponent.initialWardrobes) {
      const wardrobeFactory = this.resolver.resolveComponentFactory(WardrobeComponent);
      const ref: ComponentRef<WardrobeComponent> = characterComponent.wardrobesContainer.createComponent(wardrobeFactory);
      ref.instance.characterId = characterComponent.characterId;
      ref.instance.wardrobeName = wardrobeName;
      ref.instance.initialOutfits = characterComponent.initialWardrobes[wardrobeName];
      ref.instance.outfitClickEvent.subscribe((outfitRef: ComponentRef<OutfitComponent>) => {
        if (characterComponent.selectedOutfit) {
          characterComponent.selectedOutfit.instance.color = '';
        }
        outfitRef.instance.color = 'accent';
        characterComponent.selectedOutfit = outfitRef;
      });
  
      // place new wardrobes at the top of the page.
      characterComponent.wardrobesContainer.move(ref.hostView, 0);
      ref.changeDetectorRef.detectChanges();
  
      // for managing refs and for destroying them.
      characterComponent.wardrobes.push(ref);
    }
  }

  /**
   * display messages to the user.
   * @param message message to be displayed.
   */
  public openSnackBar(message) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
