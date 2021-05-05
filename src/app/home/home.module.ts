import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouteReuseStrategy } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CharacterModelComponent } from './components/character-display/character-model/character-model.component';
import { CharacterEquipmentComponent } from './components/character-display/character-equipment/character-equipment.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';
import { CharacterTabReuseStrategy } from './character-tab-reuse-strategy.class';

// Material Imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule  } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterComponent } from './pages/character/character.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    CharacterModelComponent,
    CharacterEquipmentComponent,
    WardrobeComponent,
    CharacterDisplayComponent,
    CharacterComponent,
    OutfitComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HomeRoutingModule
  ],
  providers: [],
  exports: [
    HomeComponent,
    CharacterComponent,
    WardrobeComponent,
    OutfitComponent
  ]
})
export class HomeModule { }
