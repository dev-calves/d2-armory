import { Component, OnInit, Input, EventEmitter, Output, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EquipmentsService } from 'src/app/core';
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
  private _itemIds: number[];
  private _wardrobeName: string;
  private _characterId: number;
  private _outfitName: string;
  private _membershipType: number;

  private _equipmentsServiceSub: Subscription;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private equipmentsService: EquipmentsService) {
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
  public set itemIds(itemIds: number[]) {
    this._itemIds = itemIds;
  }

  public get itemIds() {
    return this._itemIds;
  }

  @Input()
  public set wardrobeName(wardrobeName: string) {
    this._wardrobeName = wardrobeName;
  }

  public get wardrobeName() {
    return this._wardrobeName;
  }

  @Input()
  public set characterId(characterId: number) {
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
  public set outfitName(outfitName: string) {
    this._outfitName = outfitName;
  }

  public get outfitName() {
    return this._outfitName;
  }

  public setOutfitNameValue(value) {
    this.formControl.setValue(value);
  }

  public dawnEquips() {
    if (this.formControl.value) {
      let closeButtonElement = this.elementRef.nativeElement.querySelector('#close-button');
      let formCloseButtonElement = this.elementRef.nativeElement.querySelector('#form-close-button');
  
      closeButtonElement.disabled = true;
      formCloseButtonElement.disabled = true;
      this.elementRef.nativeElement.firstChild.disabled = true;

      this._equipmentsServiceSub = this.equipmentsService.dawnEquipment(this.itemIds, this.membershipType, this.characterId).subscribe(response => {
        if (response.equipStatus === "success") {
          this.toggleHighlights();
        }
        closeButtonElement.disabled = false;
        formCloseButtonElement.disabled = false;
        this.elementRef.nativeElement.firstChild.disabled = false;
      });
    }
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

  public saveItemIds() {
    if (!this.formControl.errors) {
      const outfit = {
        characterId: this.characterId,
        wardrobeName: this.wardrobeName,
        outfitName: this.formControl.value,
        itemIds: this.itemIds
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
    if (this._equipmentsServiceSub) this._equipmentsServiceSub.unsubscribe();
  }
}

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || control.pristine));
  }
}
