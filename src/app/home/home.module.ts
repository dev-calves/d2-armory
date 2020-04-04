import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { CharacterModelComponent } from './components/character-display/character-model/character-model.component';
import { CharacterEquipmentComponent } from './components/character-display/character-equipment/character-equipment.component';
import { CreateComponent } from './components/wardrobe/create/create.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';

// Material Imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule  } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent, 
    AuthModalComponent, 
    CharacterModelComponent, 
    CharacterEquipmentComponent, 
    CreateComponent, 
    WardrobeComponent, 
    AuthModalComponent, 
    CharacterDisplayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
