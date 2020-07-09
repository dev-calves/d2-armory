import {
  Component, OnInit, Input, Renderer2, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
} from '@angular/core';

import { OutfitComponent } from '../outfit/outfit.component';

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.css']
})
export class WardrobeComponent implements OnInit {
  private _toHide: boolean = false;
  private _wardrobeNameValue = "";
  private _wardrobeName: string;
  private _outfitsContainer: ViewContainerRef;
  private _outfitComponentRef: ComponentRef<OutfitComponent>[] = [];

  constructor(private resolver: ComponentFactoryResolver) { }

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

  @ViewChild('outfitsContainer', { read: ViewContainerRef })
  public set outfitsContainer(container: ViewContainerRef) {
    this._outfitsContainer = container;
  }

  public get outfitsContainer() {
    return this._outfitsContainer;
  }

  public close() {
    this.toHide = !this.toHide;
  }

  public addOutfit() {
    this.createOutfitComponent();
  }

  public createOutfitComponent() {
    const outfitFactory = this.resolver.resolveComponentFactory(OutfitComponent);
    const ref: ComponentRef<OutfitComponent> = this.outfitsContainer.createComponent(outfitFactory);
    this._outfitComponentRef.push(ref);
    // this._wardrobeComponentRef.instance = this.close; // for inputs
  }

  ngOnDestroy() {
    if (this._outfitComponentRef.length > 0) {
      this._outfitComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
  }

}
