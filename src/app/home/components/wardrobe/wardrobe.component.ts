import {
  Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef,
  OnDestroy,
  Input,
  ElementRef
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ICurrentUserMembership } from 'src/app/core'
import { WardrobeService } from './wardrobe.service';


@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit, AfterViewInit, OnDestroy {
  private _toHide = false;
  private _wardrobeName: string;
  private _outfitsContainer: ViewContainerRef;
  private _outfitsParentContainer;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _addOutfitButton;
  private _currentUserMembership: ICurrentUserMembership;
  private _characterId: string;
  private _transferStorage: string;
  private _outfits: HTMLCollection;
  private _initialOutfits;

  constructor(
    public wardrobeService: WardrobeService,
    public elementRef: ElementRef) {

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
    
    this.wardrobeService.outfitsContainer = this.outfitsContainer;
  }

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
  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  @Input()
  public set characterId(characterId: string) {
    this._characterId = characterId;
  }
  public get characterId() {
    return this._characterId;
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

  @ViewChild('addOutfitButton')
  public set addOutfitButton(addOutfitButton) {
    this._addOutfitButton = addOutfitButton;
  }
  public get addOutfitButton() {
    return this._addOutfitButton;
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

  /**
   * updates wardrobeService with the target container.
   * adds an outfit to the target wardrobe.
   */
  public addOutfit() {
    this.wardrobeService.outfitsContainer = this.outfitsContainer;

    this.wardrobeService.addOutfit(
      this.elementRef, 
      this.outfits, 
      this.currentUserMembership, 
      this.characterId, 
      this.formControl?.value, 
      this.transferStorage);
  }

  // remove wardrove from view.
  public close() {
    this.toHide = !this.toHide;

    // remove all outfits on the wardrobe.
    this.wardrobeService.deleteWardrobeLocal(this.characterId, this.wardrobeName);
  }

  ngOnDestroy() {
    this.wardrobeService.destroy();
  }
}

// error checker for the wardrobe name.
class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
