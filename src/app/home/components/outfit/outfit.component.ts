import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ICurrentUserMembership } from 'src/app/core';
import { IEquipment } from 'src/app/core/models/api/equipment.model';
import { OutfitService } from './outfit.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit {
  private _toHide: boolean = false;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _equipment: IEquipment;
  private _wardrobeName: string;
  private _characterId: string;
  private _outfitName: string;
  private _transferStorage: string;
  private _currentUserMembership: ICurrentUserMembership;

  constructor(public elementRef: ElementRef, private outfitService: OutfitService) {
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

  @Input()
  public set equipment(equipment: IEquipment) {
    this._equipment = equipment;
  }
  public get equipment() {
    return this._equipment;
  }

  @Input()
  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
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

  @Input()
  public set transferStorage(transferStorage: string) {
    this._transferStorage = transferStorage;
  }
  public get transferStorage() {
    return this._transferStorage;
  }

  public setOutfitNameValue(value) {
    this.formControl.setValue(value);
  }

  @Output() toggleHighlightsEvent: EventEmitter<any> = new EventEmitter<ElementRef>();

  /**
   * sends a request to equip the items stored on this outfit.
   */
  public dawnEquips() {
    if (this.formControl?.value) { // trigger the events if the outfit element has a title set.
      this.toggleHighlightsEvent.emit(this.elementRef);

      this.outfitService.dawnEquipment(
                this.equipment, 
                this.currentUserMembership, 
                this.characterId, 
                this.transferStorage);
    }
  }

  /**
   * remove the outfit button from view.
   */
  public close() {
    this.toHide = !this.toHide;

    this.outfitService.removeCurrentEquipmentLocal(this.characterId, this.wardrobeName, this.outfitName);
  }

  /**
   * store currently equipped items to an outfit button.
   */
  public saveEquipment() {
    // don't store equipment to an outfit without a proper name.
    if (!this.formControl.errors) {
      // when the button is a name change, delete previous localStorage name of outfit.
      this.outfitService.removePreviousEquipmentLocal(this.characterId, this.wardrobeName, this.outfitName)
      
      // update name of outfit.
      this.outfitName = this.formControl.value;

      // store outfit with a new name || store new outfit.
      this.outfitService.saveEquipmentLocal(this.wardrobeName, this.characterId,this.outfitName, this.equipment);
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
