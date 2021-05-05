import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Equipment } from 'src/app/core/models/api/equipment.model';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit, AfterViewInit {
  private _toHide: boolean = false;
  private _formControl: FormControl;
  private _matcher: FormErrorStateMatcher;
  private _equipment: Equipment;
  private _wardrobeName: string;
  private _characterId: string;
  private _outfitName: string;
  private _membershipType: string;
  private _membershipId: string;
  private _transferStorage: string;

  constructor(private elementRef: ElementRef) {
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

  ngAfterViewInit() {
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
  public set equipment(equipment: Equipment) {
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
  public set membershipType(membershipType: string) {
    this._membershipType = membershipType;
  }

  public get membershipType() {
    return this._membershipType;
  }

  @Input()
  public set membershipId(membershipId: string) {
    this._membershipId = membershipId;
  }

  public get membershipId() {
    return this._membershipId;
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

  @Output() dawnEquipmentEvent: EventEmitter<any> = new EventEmitter<any>();

  public dawnEquips() {
    if (this.formControl?.value) { // trigger the events if the outfit element has a title set.
      this.toggleHighlightsEvent.emit(this.elementRef);
      this.dawnEquipmentEvent.emit(this.equipment);
    }
  }

  @Output() toggleHighlightsEvent: EventEmitter<any> = new EventEmitter<ElementRef>();

  public close() {
    this.toHide = !this.toHide;

    let storedOutfits = JSON.parse(localStorage.getItem('outfits'));

    delete storedOutfits[this.characterId][this.wardrobeName][this.outfitName];

    localStorage.setItem('outfits', JSON.stringify(storedOutfits));
  }

  public saveEquipment() {
    if (!this.formControl.errors) {
      const outfit = {
        wardrobeName: this.wardrobeName,
        outfitName: this.formControl.value,
        equipment: this.equipment
      };

      let outfits = {};

      if (localStorage.getItem('outfits')) {
        outfits = Object.assign({}, JSON.parse(localStorage.getItem('outfits')));

        if (outfits[this.characterId]) {
          if (outfits[this.characterId][this.wardrobeName]) {
            outfits[this.characterId][this.wardrobeName][this.formControl.value] = outfit;
          } else {
            outfits[this.characterId][this.wardrobeName] = {};
            outfits[this.characterId][this.wardrobeName][this.formControl.value] = outfit;
          }
        } else {
          outfits[this.characterId] = {};
          outfits[this.characterId][this.wardrobeName] = {};
          outfits[this.characterId][this.wardrobeName][this.formControl.value] = outfit;
        }
      } else {
        outfits[this.characterId] = {};
        outfits[this.characterId][this.wardrobeName] = {};
        outfits[this.characterId][this.wardrobeName][this.formControl.value] = outfit;
      }

      localStorage.setItem('outfits', JSON.stringify(outfits));
    }
  }

  ngOnDestroy() { }
}

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
