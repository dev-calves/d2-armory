import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { PassportComponent } from './components/passport/passport.component';
import { CharacterModelComponent } from './components/character-display/character-model/character-model.component';
import { CharacterEquipmentComponent } from './components/character-display/character-equipment/character-equipment.component';
import { CreateComponent } from './components/wardrobe/create/create.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';


@NgModule({
  declarations: [
    HomeComponent, 
    PassportComponent, 
    CharacterModelComponent, 
    CharacterEquipmentComponent, 
    CreateComponent, 
    WardrobeComponent, 
    PassportComponent, 
    CharacterDisplayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
