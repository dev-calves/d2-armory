import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WardrobeComponent } from '../../components/wardrobe/wardrobe.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  private _wardrobes: ViewContainerRef;
  private _wardrobeComponentRef: ComponentRef<WardrobeComponent>[] = [];
  private _wardrobeParentContainer;

  private _queryParamsSub: Subscription;

  constructor(private _snackBar: MatSnackBar,
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
    });
  }

  @ViewChild('wardrobesContainer', { read: ViewContainerRef })
  public set wardrobes(element: ViewContainerRef) {
    this._wardrobes = element;
  }

  public get wardrobes() {
    return this._wardrobes;
  }

  @ViewChild('wardrobesParentContainer')
  public set wardrobeParentContainer(element) {
    this._wardrobeParentContainer = element;
  }

  public get wardrobeParentContainer() {
    return this._wardrobeParentContainer;
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

    Array.from(wardrobes).forEach(element => {
      if (element?.children?.length > 0) {
        wardrobeCounter++;
      }
    });

    if (wardrobeCounter <= 6) { // limit is 7 wardrobe components
      const wardrobeFactory = this.resolver.resolveComponentFactory(WardrobeComponent);
      const ref: ComponentRef<WardrobeComponent> = this.wardrobes.createComponent(wardrobeFactory);
      this._wardrobeComponentRef.push(ref);
    } else {
      this.openSnackBar('Max wardrobes reached');
    }
  }

  public openSnackBar(message) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    });
  }

  ngOnDestroy() {
    if (this._wardrobeComponentRef.length > 0) {
      this._wardrobeComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
    if (this._queryParamsSub) { this._queryParamsSub.unsubscribe(); }
  }
}
