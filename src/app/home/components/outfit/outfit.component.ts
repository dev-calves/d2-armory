import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EquipmentService } from 'src/app/core';
import { Equipment } from 'src/app/core/models/api/equipment.model';
import { Subscription } from 'rxjs';

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
  private _membershipType: number;
  private _membershipId: string;
  private _transferStorage: string;

  private _equipmentServiceSub: Subscription;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private equipmentService: EquipmentService) {
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
  public set membershipType(membershipType: number) {
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

  public dawnEquips() {
    console.log(this.transferStorage)
    // if (this.formControl.value) {
    //   let closeButtonElement = this.elementRef.nativeElement.querySelector('#close-button');
    //   let formCloseButtonElement = this.elementRef.nativeElement.querySelector('#form-close-button');
  
    //   closeButtonElement.disabled = true;
    //   formCloseButtonElement.disabled = true;
    //   this.elementRef.nativeElement.firstChild.disabled = true;

    //   this._equipmentServiceSub = this.equipmentService.dawnEquipment(this.equipment, this.membershipType, this.membershipId, this.characterId, this.transferStorage).subscribe(response => {
    //     if (response.equipStatus === "success") {
    //       this.toggleHighlights();
    //     }
    //     closeButtonElement.disabled = false;
    //     formCloseButtonElement.disabled = false;
    //     this.elementRef.nativeElement.firstChild.disabled = false;
    //   });
    // }
  }

  @Output() toggleHighlightsEvent: EventEmitter<any> = new EventEmitter<ElementRef>();

  public toggleHighlights() {
    this.toggleHighlightsEvent.emit(this.elementRef);
  }

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

  ngOnDestroy() {
    if (this._equipmentServiceSub) this._equipmentServiceSub.unsubscribe();
  }
}

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
