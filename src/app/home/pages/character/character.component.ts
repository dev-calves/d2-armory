import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WardrobeComponent } from '../../components/wardrobe/wardrobe.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CurrentUserMembershipService } from 'src/app/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  private _wardrobesContainer: ViewContainerRef;
  private _wardrobeComponentRef: ComponentRef<WardrobeComponent>[] = [];
  private _wardrobeParentContainer;
  private _currentUserMembership;
  private _characterId;
  private _wardrobes = [];

  private _queryParamsSub: Subscription;
  private _currentUserMembershipSub: Subscription;

  constructor(private currentUserMembershipService: CurrentUserMembershipService,
    private _snackBar: MatSnackBar,
    private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this._queryParamsSub = this.route.queryParams.subscribe(params => {
      // character component should only initialize with the query param id provided.
      if (!params.id) {
        this.router.navigate(['home']);
      }

      this.characterId = params.id;
      this._currentUserMembershipSub = this.currentUserMembershipService.getCurrentUserMembership().subscribe(currentUserMembershipResponse => {
        this.currentUserMembership = currentUserMembershipResponse;

        // TODO: re-work this after database is implemented.
        let storedCharacterOutfits = JSON.parse(localStorage.getItem('outfits'));

        if (this.currentUserMembership && storedCharacterOutfits && storedCharacterOutfits[this.characterId] && Object.keys(storedCharacterOutfits[this.characterId]).length > 0) {
          this.wardrobes = storedCharacterOutfits[this.characterId];
        }
      });
    });
  }

  @ViewChild('wardrobesContainer', { read: ViewContainerRef })
  public set wardrobesContainer(element: ViewContainerRef) {
    this._wardrobesContainer = element;
  }

  public get wardrobesContainer() {
    return this._wardrobesContainer;
  }

  @ViewChild('wardrobesParentContainer')
  public set wardrobeParentContainer(element) {
    this._wardrobeParentContainer = element;
  }

  public get wardrobeParentContainer() {
    return this._wardrobeParentContainer;
  }

  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  public set currentUserMembership(currentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }

  public get characterId() {
    return this._characterId;
  }

  public set characterId(characterId) {
    this._characterId = characterId;
  }

  public get wardrobes() {
    return this._wardrobes;
  }

  public set wardrobes(wardrobes) {
    this._wardrobes = wardrobes;
  }

  public addWardrobe() {
    const wardrobeError: HTMLElement = this.wardrobeParentContainer.nativeElement.querySelector('mat-error');

    if (wardrobeError) {
      this.openSnackBar(wardrobeError.innerHTML);
    } else {
      this.createWardrobeComponent();
    }
  }

  public createWardrobeComponent() {
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
      ref.instance.currentUserMembership = this.currentUserMembership;
      ref.instance.characterId = this.characterId;

      this._wardrobeComponentRef.push(ref);
    } else {
      this.openSnackBar('Max wardrobes reached');
    }
  }

  public openSnackBar(message) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnDestroy() {
    if (this._wardrobeComponentRef.length > 0) {
      this._wardrobeComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
    if (this._queryParamsSub) { this._queryParamsSub.unsubscribe(); }
    if (this._currentUserMembershipSub) { this._currentUserMembershipSub.unsubscribe(); }
  }
}
