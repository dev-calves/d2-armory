import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit {
  private _outfitNameValue: string = "";
  private _toHide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public set outfitNameValue(outfitName: string) {
    this._outfitNameValue = outfitName
  }

  public get outfitNameValue() {
    return this._outfitNameValue;
  }

  public set toHide(status: boolean) {
    this._toHide = status;
  }

  public get toHide() {
    return this._toHide;
  }

  public close() {
    this.toHide = !this.toHide;
  }

}
