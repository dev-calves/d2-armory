import {
  Component, OnInit, ViewChild, ViewContainerRef,
  OnDestroy,
  Input
} from '@angular/core';

import { ICurrentUserMembership } from 'src/app/core/models/api/current-user-membership-response.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  private _wardrobesContainer: ViewContainerRef;
  private _wardrobeParentContainer;
  private _currentUserMembership: ICurrentUserMembership;
  private _characterId;
  private _wardrobes = [];
  private _transferStorage: string;

  constructor(
    public characterService: CharacterService) { }

  ngOnInit(): void {
    // TODO: re-work this after database is implemented.
    let storedCharacterOutfits = JSON.parse(localStorage.getItem('outfits'));

    if (this.currentUserMembership && storedCharacterOutfits && 
      storedCharacterOutfits[this.characterId] && 
      Object.keys(storedCharacterOutfits[this.characterId]).length > 0) {
      this.wardrobes = storedCharacterOutfits[this.characterId];
    }
  }

  @ViewChild('wardrobesContainer', { read: ViewContainerRef })
  public set wardrobesContainer(element: ViewContainerRef) {
    this._wardrobesContainer = element;
    this.characterService.wardrobesContainer = element;
  }

  public get wardrobesContainer() {
    return this._wardrobesContainer;
  }

  @ViewChild('wardrobesParentContainer')
  public set wardrobeParentContainer(element) {
    this._wardrobeParentContainer = element;
    this.characterService.wardrobeParentContainer = element;
  }

  public get wardrobeParentContainer() {
    return this._wardrobeParentContainer;
  }

  public get currentUserMembership() {
    return this._currentUserMembership;
  }

  @Input()
  public set currentUserMembership(currentUserMembership: ICurrentUserMembership) {
    this._currentUserMembership = currentUserMembership;
  }

  public get characterId() {
    return this._characterId;
  }

  @Input()
  public set characterId(characterId) {
    this._characterId = characterId;
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

  public set wardrobes(wardrobes) {
    this._wardrobes = wardrobes;
  }

  ngOnDestroy() {
    this.characterService.destroy();
  }
}
