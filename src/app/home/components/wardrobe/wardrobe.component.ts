import {
  Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Input,
  Output,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutfitComponent } from '../outfit/outfit.component';

import { EquipmentService, ICurrentUserMembership } from 'src/app/core'

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit, AfterViewInit, OnDestroy {
  private _toHide = false;
  private _wardrobeName: string;
  private _outfitsContainer: ViewContainerRef;
  private _outfitComponentRef: ComponentRef<OutfitComponent>[] = [];
  private _outfitsParentContainer;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _outfitCardContainer;
  private _addOutfitButton;
  private _currentUserMembership: ICurrentUserMembership;
  private _characterId: string;
  private _transferStorage: string;
  private _outfits: HTMLCollection;
  private _initialOutfits;

  private _equipmentServiceSub;

  constructor(
    private equipmentService: EquipmentService,
    private _snackBar: MatSnackBar,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2) {

    this.formControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 _]*$') // alphanumeric
    ]);

    this.matcher = new FormErrorStateMatcher();
  }

  ngOnInit(): void {
    if (this.wardrobeName) {
      this.setWardrobeNameValue(this.wardrobeName);
    }
  }

  ngAfterViewInit() {
    this.outfits = this.outfitsParentContainer.nativeElement.children;
  }

  @Output() dawnEquipmentEvent: EventEmitter<any> = new EventEmitter<any>();

  public set toHide(status: boolean) {
    this._toHide = status;
  }

  public get toHide() {
    return this._toHide;
  }

  @Input()
  public set wardrobeName(name) {
    this._wardrobeName = name;
  }

  public get wardrobeName() {
    return this._wardrobeName;
  }

  public setWardrobeNameValue(value) {
    this.formControl.setValue(value);
  }

  @Input()
  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }

  @Input()
  public get characterId() {
    return this._characterId;
  }

  public set characterId(characterId: string) {
    this._characterId = characterId;
  }

  public set outfits(outfits: HTMLCollection) {
    this._outfits = outfits;
  }

  public get outfits() {
    return this._outfits;
  }

  @Input()
  public set initialOutfits(initialOutfits) {
    this._initialOutfits = initialOutfits;
  }

  public get initialOutfits() {
    return this._initialOutfits;
  }

  @Input()
  public set transferStorage(transferStorage: string) {
    this._transferStorage = transferStorage;
  }

  public get transferStorage() {
    return this._transferStorage;
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

  public get outfitCardContainer() {
    return this._outfitCardContainer;
  }

  @ViewChild('outfitCardContainer')
  public set outfitCardContainer(outfitCardContainer) {
    this._outfitCardContainer = outfitCardContainer;
  }

  public get addOutfitButton() {
    return this._addOutfitButton;
  }

  @ViewChild('addOutfitButton')
  public set addOutfitButton(addOutfitButton) {
    this._addOutfitButton = addOutfitButton;
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

  public dawnEquipmentEmit(value: object) {
    this.dawnEquipmentEvent.emit(value);
  }

  public close() {
    this.toHide = !this.toHide;

    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));

    delete storedOutfits[this.characterId][this.wardrobeName];

    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
  }

  public addOutfit() {
    const outfitError: HTMLElement = this.outfitCardContainer.nativeElement.querySelector('mat-error');

    if (outfitError) {
      this.openSnackBar(outfitError.innerHTML);
    } else {
      this.createOutfitComponent();
    }
  }

  public createOutfitComponent() {
    let outfitCounter = 0;

    // to ignore hidden outfit components.
    Array.from(this.outfits).forEach(element => {
      if (element?.children?.length > 0) {
        outfitCounter++;
      }
    });

    if (outfitCounter < 10) { // max outfits are 10.
      this.addOutfitButton.disabled = true;

      this._equipmentServiceSub = this.equipmentService.captureEquipment(
        this.currentUserMembership.membershipId,
        this.currentUserMembership.membershipType,
        this.characterId
      ).subscribe(captureResponse => {
        const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
        const ref: ComponentRef<OutfitComponent> = this.outfitsContainer.createComponent(outfitFactory);

        ref.instance.characterId = this.characterId;
        ref.instance.wardrobeName = this.formControl.value;
        ref.instance.equipment = captureResponse.equipment;
        ref.instance.membershipType = this.currentUserMembership.membershipType;
        ref.instance.membershipId = this.currentUserMembership.membershipId;
        ref.instance.transferStorage = this.transferStorage;
        ref.instance.toggleHighlightsEvent.subscribe(outfitElement => {
          ref.changeDetectorRef.detectChanges();
          this.toggleHighlights(outfitElement);
        });
        ref.instance.dawnEquipmentEvent.subscribe(formValue => {
          ref.changeDetectorRef.detectChanges();
          this.dawnEquipmentEmit(formValue);
        });

        this._outfitComponentRef.push(ref);

        this.addOutfitButton.disabled = false;
      });
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

  public toggleHighlights(elementRef) {
    let characterOutfits = document.querySelectorAll('app-outfit');

    Array.from(characterOutfits).forEach((element: HTMLElement) => {
      if (element.children.length > 0) { // ignore the container div
        this.renderer.removeStyle(element.firstChild, 'background-color');
        this.renderer.removeStyle(element.firstChild, 'color');
      }
    });

    this.renderer.setStyle(elementRef.nativeElement.firstChild, 'background-color', 'grey');
    this.renderer.setStyle(elementRef.nativeElement.firstChild, 'color', 'black');
  }

  ngOnDestroy() {
    if (this._outfitComponentRef.length > 0) {
      this._outfitComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
    if (this._equipmentServiceSub) this._equipmentServiceSub.unsubscribe();
  }
}

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
