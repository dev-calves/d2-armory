import {
  Component, OnInit, Renderer2, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory, AfterViewInit, AfterViewChecked
} from '@angular/core';
import { WardrobeComponent } from '../../components/wardrobe/wardrobe.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, AfterViewInit {

  private _wardrobes: ViewContainerRef
  private _wardrobeComponentRef: ComponentRef<WardrobeComponent>[] = [];

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  @ViewChild('wardrobesContainer', { read: ViewContainerRef })
  public set wardrobes(element: ViewContainerRef) {
    this._wardrobes = element;
  }

  public get wardrobes() {
    return this._wardrobes;
  }

  public addWardrobe() {
    this.createWardrobeComponent();
  }

  public createWardrobeComponent() {
    const wardrobeFactory = this.resolver.resolveComponentFactory(WardrobeComponent);
    let ref: ComponentRef<WardrobeComponent> = this.wardrobes.createComponent(wardrobeFactory);
    this._wardrobeComponentRef.push(ref);
    // this._wardrobeComponentRef.instance = this.close; // for inputs
  }

  ngOnDestroy(){
    if (this._wardrobeComponentRef.length > 0) {
      this._wardrobeComponentRef.forEach(ref => {
        ref.destroy();
      });
    }
  }
}
