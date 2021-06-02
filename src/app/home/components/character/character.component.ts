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

import { ICurrentUserMembership } from 'src/app/core/models/api/current-user-membership-response.model';
import { environment } from 'src/environments/environment';
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
  private _currentUserMembership: ICurrentUserMembership;
  private _characterId: string;
  private _initialWardrobes;
  private _wardrobes: ComponentRef<WardrobeComponent>[] = [];
  private _selectedOutfit: ComponentRef<OutfitComponent>;
  private _transferStorage: string;

  constructor(
    public characterService: CharacterService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // TODO: re-work this after database is implemented.
    let storedCharacterOutfits = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_EQUIPMENT));

    if (this.currentUserMembership && storedCharacterOutfits &&
      storedCharacterOutfits[this.characterId] &&
      Object.keys(storedCharacterOutfits[this.characterId]).length > 0) {
      this._initialWardrobes = storedCharacterOutfits[this.characterId];
    }
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
  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }
  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  @Input()
  public set characterId(characterId) {
    this._characterId = characterId;
  }
  public get characterId() {
    return this._characterId;
  }

  @Input()
  public set transferStorage(transferStorage: string) {
    this._transferStorage = transferStorage;
  }
  public get transferStorage() {
    return this._transferStorage;
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

  public addWardrobe() {
    this.characterService.addWardrobe(this);
  }

  ngOnDestroy() {
    this.wardrobes.forEach((wardrobe: ComponentRef<WardrobeComponent>) => {
      wardrobe.destroy();
    })
  }
}
