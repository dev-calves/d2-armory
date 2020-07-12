import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutfitComponent } from '../outfit/outfit.component';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit, OnDestroy {
  private _toHide = false;
  private _wardrobeNameValue = '';
  private _wardrobeName: string;
  private _outfitsContainer: ViewContainerRef;
  private _outfitComponentRef: ComponentRef<OutfitComponent>[] = [];
  private _outfitsParentContainer;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _card;

  constructor(private _snackBar: MatSnackBar, private resolver: ComponentFactoryResolver) {
    this.formControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 _]*$') // alphanumeric
    ]);

    this.matcher = new FormErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  public set toHide(status: boolean) {
    this._toHide = status;
  }

  public get toHide() {
    return this._toHide;
  }

  public set wardrobeName(name) {
    this._wardrobeName = name;
  }

  public get wardrobeName() {
    return this._wardrobeName;
  }

  public set wardrobeNameValue(value: string) {
    this._wardrobeNameValue = value;
  }

  public get wardrobeNameValue() {
    return this._wardrobeNameValue;
  }

  public setWardrobeNameValue(value) {
    this.formControl.setValue(value);
  }

  @ViewChild('outfitsContainer', { read: ViewContainerRef })
  public set outfitsContainer(container: ViewContainerRef) {
    this._outfitsContainer = container;
  }

  public get outfitsContainer() {
    return this._outfitsContainer;
  }

  @ViewChild('outfitsParentContainer')
  public set outfitsParentContainer(container: any) {
    this._outfitsParentContainer = container;
  }

  public get outfitsParentContainer() {
    return this._outfitsParentContainer;
  }

  public get card() {
    return this._card;
  }

  @ViewChild('outfitCardContainer')
  public set card(card) {
    this._card = card;
  }

  public set formControl(control) {
    this._formControl = control;
  }

  public get formControl() {
    return this._formControl;
  }

  public set matcher(matcher) {
    this._matcher = matcher;
  }

  public get matcher() {
    return this._matcher;
  }

  public close() {
    this.toHide = !this.toHide;
  }

  public addOutfit() {
    const outfitError: HTMLElement = this.card.nativeElement.querySelector('mat-error');

    if (outfitError) {
      this.openSnackBar(outfitError.innerHTML);
    } else {
      this.createOutfitComponent();
    }
  }

  public createOutfitComponent() {
    let outfitsContainerCounter = 0;
    const outfits = this.outfitsParentContainer.nativeElement.children;

    Array.from(outfits).forEach((element: HTMLElement) => {
      if (element?.children?.length > 0) {
        outfitsContainerCounter++;
      }
    });

    if (outfitsContainerCounter <= 9) { // max outfits are 10
      const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
      const ref: ComponentRef<OutfitComponent> = this.outfitsContainer.createComponent(outfitFactory);
      this._outfitComponentRef.push(ref);
    } else {
      this.openSnackBar('Max outfits reached');
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
    if (this._outfitComponentRef.length > 0) {
      this._outfitComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
  }
}

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
