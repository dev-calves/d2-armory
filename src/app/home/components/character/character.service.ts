import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICurrentUserMembership } from 'src/app/core';
import { WardrobeComponent } from 'src/app/home/components/wardrobe/wardrobe.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private _wardrobeComponentRef: ComponentRef<WardrobeComponent>[] = [];
  private _wardrobeParentContainer: ElementRef;
  private _wardrobesContainer: ViewContainerRef;

  constructor(private _snackBar: MatSnackBar, private resolver: ComponentFactoryResolver) { }

  public set wardrobesContainer(container: ViewContainerRef) {
    this._wardrobesContainer = container;
  }
  public get wardrobesContainer(){
    return this._wardrobesContainer;
  }

  public set wardrobeParentContainer(container: ElementRef) {
    this._wardrobeParentContainer = container;
  }
  public get wardrobeParentContainer() {
    return this._wardrobeParentContainer;
  }

  /**
   * creates a wardrobe upon button click.
   * @param characterId character id.
   * @param currentUserMembership user account info.
   */
  public addWardrobe(characterId: string, currentUserMembership: ICurrentUserMembership) {
    const wardrobeError: HTMLElement = this.wardrobeParentContainer.nativeElement.querySelector('mat-error');

    // creates a wardrobe if the form is filled properly.
    if (wardrobeError) {
      this.openSnackBar(wardrobeError.innerHTML);
    } else {
      this.createWardrobeComponent(characterId, currentUserMembership);
    }
  }

  /**
   * creates wardrobes and stores them to be destroyed later.
   * @param characterId character id.
   * @param currentUserMembership user account info.
   */
  public createWardrobeComponent(characterId: string, currentUserMembership: ICurrentUserMembership) {
    let wardrobeCounter = 0;
    const wardrobes: HTMLCollection = this.wardrobeParentContainer.nativeElement.children;

    // hidden wardrobes will fill up this array.
    // this counter will ignore hidden wardrobes.
    Array.from(wardrobes).forEach(element => {
      if (element?.children?.length > 0) {
        wardrobeCounter++;
      }
    });

    if (wardrobeCounter < 7) { // limit is 7 wardrobe components.
      const wardrobeFactory = this.resolver.resolveComponentFactory(WardrobeComponent);
      const ref: ComponentRef<WardrobeComponent> = this.wardrobesContainer.createComponent(wardrobeFactory);
      ref.instance.currentUserMembership = currentUserMembership;
      ref.instance.characterId = characterId;

      // place new wardrobes at the top of the page.
      this.wardrobesContainer.move(ref.hostView, 0);
      // ref.changeDetectorRef.detectChanges();

      // store refs for destruction.
      this._wardrobeComponentRef.push(ref);
    } else {
      this.openSnackBar('Max wardrobes reached');
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

  /**
   * destroy refs.
   */
  public destroy() {
    this._wardrobeComponentRef.forEach((wardrobe: ComponentRef<WardrobeComponent>) => {
      wardrobe.destroy();
    })
  }
}
