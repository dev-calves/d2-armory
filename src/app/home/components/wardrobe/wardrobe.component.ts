import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  Input,
  ElementRef,
  ComponentRef,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { WardrobeService } from './wardrobe.service';
import { OutfitComponent } from '../../components/outfit/outfit.component';
import { LocalStorageService } from 'src/app/core';

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
  private _characterId: string;
  private _outfits: ComponentRef<OutfitComponent>[] = [];
  private _initialOutfits;

  constructor(
    public wardrobeService: WardrobeService,
    public elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private localStorageService: LocalStorageService
    ) {

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
    this.wardrobeService.initializeOutfits(
      this.initialOutfits, 
      this.outfitsContainer,
      this.outfits, 
      this.characterId, 
      this.formControl?.value, 
      this.outfitClickEvent);
      this.changeDetectorRef.detectChanges();
  }

  @Output() outfitClickEvent: EventEmitter<any> = new EventEmitter<ComponentRef<OutfitComponent>>();

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
  public set characterId(characterId: string) {
    this._characterId = characterId;
  }
  public get characterId() {
    return this._characterId;
  }

  public set outfits(outfits: ComponentRef<OutfitComponent>[]) {
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
    this.wardrobeService.addOutfit(
      this.elementRef,
      this.outfitsContainer,
      this.outfits,
      this.characterId,
      this.formControl?.value,
      this.outfitClickEvent);
  }

  // remove wardrove from view.
  public close() {
    this.toHide = !this.toHide;

    // remove all outfits on the wardrobe.
    this.localStorageService.deleteWardrobeLocal(this.characterId, this.wardrobeName);
  }

  ngOnDestroy() {
    this.wardrobeService.destroy();
    this.outfits.forEach((ref: ComponentRef<OutfitComponent>) => {
      ref.destroy();
    });
  }
}

// error checker for the wardrobe name.
class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
