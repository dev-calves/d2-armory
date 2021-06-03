import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { LocalStorageService } from 'src/app/core';

import { IEquipment } from 'src/app/core/models/api/equipment.model';
import { OutfitService } from './outfit.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit {
  private _toHide: boolean = false;
  private _ignoreSpaceKey: boolean = false;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _equipment: IEquipment;
  private _wardrobeName: string;
  private _characterId: string;
  private _outfitName: string;
  private _color: string = '';

  constructor(
    public elementRef: ElementRef, 
    private outfitService: OutfitService,
    private localStorageService: LocalStorageService
    ) {
    this.formControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 _]*$') // alphanumeric
    ]);

    this.matcher = new FormErrorStateMatcher();
  }

  ngOnInit(): void {
    if (this.outfitName) {
      this.setOutfitNameValue(this.outfitName);
    }
  }

  public set toHide(status: boolean) {
    this._toHide = status;
  }
  public get toHide() {
    return this._toHide;
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

  public set color(color: string) {
    this._color = color;
  }
  public get color(){
    return this._color;
  }

  @Input()
  public set equipment(equipment: IEquipment) {
    this._equipment = equipment;
  }
  public get equipment() {
    return this._equipment;
  }

  @Input()
  public set wardrobeName(wardrobeName: string) {
    this._wardrobeName = wardrobeName;
  }
  public get wardrobeName() {
    return this._wardrobeName;
  }

  @Input()
  public set characterId(characterId: string) {
    this._characterId = characterId;
  }
  public get characterId() {
    return this._characterId;
  }

  @Input()
  public set outfitName(outfitName: string) {
    this._outfitName = outfitName;
  }
  public get outfitName() {
    return this._outfitName;
  }

  @ViewChild('nameText') 
  public nameTextInput: MatInput

  public setOutfitNameValue(value) {
    this.formControl.setValue(value);
  }

  @Output() outfitClickEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * sends a request to equip the items stored on this outfit.
   */
  public dawnEquips() {
    // trigger the events if the outfit element has a title set.
    if (this.formControl?.value && !this._ignoreSpaceKey) { 
      this.outfitClickEvent.emit();

      this.outfitService.dawnEquipment(
                this.equipment, 
                this.characterId, 
                );
    }
    this._ignoreSpaceKey = false;
  }

  /**
   * remove the outfit button from view.
   */
  public close() {
    this.toHide = !this.toHide;

    this.localStorageService.removeCurrentEquipmentLocal(this.characterId, this.wardrobeName, this.outfitName);
  }

  /**
   * store currently equipped items to an outfit button.
   */
  public saveEquipment() {
    // don't store equipment to an outfit without a proper name.
    if (!this.formControl.errors) {
      // when the button is a name change, delete previous localStorage name of outfit.
      this.localStorageService.removePreviousEquipmentLocal(this.characterId, this.wardrobeName, this.outfitName);
      
      // update name of outfit.
      this.outfitName = this.formControl.value;

      // store outfit with a new name || store new outfit.
      this.localStorageService.saveEquipmentLocal(this.wardrobeName, this.characterId,this.outfitName, this.equipment);
    }
  }

  /**
   * normally pressing space or enter on a form button will trigger onClick event.
   * this will ignore the space press to allow adding spaces to outfit names.
   * @param event holds the key press event data.
   */
  public keyPress(event: KeyboardEvent) {
    if (event.key === ' ') {
      this._ignoreSpaceKey = true;
    } else if (event.key === 'Enter') {
      this.dawnEquips();
    }
  }

  ngOnDestroy() { }
}

/**
 * form checker for the outfit name.
 */
class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
