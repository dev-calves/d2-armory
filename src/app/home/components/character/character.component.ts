import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  Input,
  ComponentRef,
  ChangeDetectorRef
} from '@angular/core';
import { CurrentMembershipService, LocalStorageService } from 'src/app/core';

import { OutfitComponent } from '../outfit/outfit.component';
import { WardrobeComponent } from '../wardrobe/wardrobe.component';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, AfterViewInit, OnDestroy {
  private _wardrobesContainer: ViewContainerRef;
  private _wardrobeParentContainer;
  private _characterId: string;
  private _initialWardrobes;
  private _wardrobes: ComponentRef<WardrobeComponent>[] = [];
  private _selectedOutfit: ComponentRef<OutfitComponent>;

  constructor(
    public characterService: CharacterService,
    private changeDetectorRef: ChangeDetectorRef,
    public currentMembershipService: CurrentMembershipService,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    this._initialWardrobes = this.localStorageService.getInitialWardrobes(this.characterId);
  }

  ngAfterViewInit(): void {
    this.characterService.initializeWardrobes(this);
    this.changeDetectorRef.detectChanges();
  }

  @ViewChild('wardrobesContainer', { read: ViewContainerRef })
  public set wardrobesContainer(element: ViewContainerRef) {
    this._wardrobesContainer = element;
  }
  public get wardrobesContainer() {
    return this._wardrobesContainer;
  }

  @ViewChild('wardrobesParentContainer')
  public set wardrobeParentContainer(element) {
    this._wardrobeParentContainer = element;
  }
  public get wardrobeParentContainer() {
    return this._wardrobeParentContainer;
  }

  @Input()
  public set characterId(characterId) {
    this._characterId = characterId;
  }
  public get characterId() {
    return this._characterId;
  }

  public get wardrobes() {
    return this._wardrobes;
  }
  public set wardrobes(wardrobes: ComponentRef<WardrobeComponent>[]) {
    this._wardrobes = wardrobes;
  }
  
  public set initialWardrobes(initialWardrobes) {
    this._initialWardrobes = initialWardrobes;
  }
  public get initialWardrobes() {
    return this._initialWardrobes
  }

  public set selectedOutfit(selectedOutfit: ComponentRef<OutfitComponent>) {
    this._selectedOutfit = selectedOutfit
  }
  public get selectedOutfit() {
    return this._selectedOutfit;
  }

  /**
   * creates a new wardrobe component.
   */
  public addWardrobe() {
    this.characterService.addWardrobe(this);
  }

  ngOnDestroy() {
    this.wardrobes.forEach((wardrobe: ComponentRef<WardrobeComponent>) => {
      wardrobe.destroy();
    })
  }
}
