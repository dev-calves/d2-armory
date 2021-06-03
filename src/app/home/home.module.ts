import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material Imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule  } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HomeComponent } from './pages/home/home.component';
import { WardrobeComponent } from './components/wardrobe/wardrobe.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { CharacterComponent } from './components/character/character.component';
import { OutfitService } from './components/outfit/outfit.service';
import { WardrobeService } from './components/wardrobe/wardrobe.service';
import { CharacterService } from './components/character/character.service';

@NgModule({
  declarations: [
    HomeComponent,
    WardrobeComponent,
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
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HomeRoutingModule
  ],
  providers: [
    OutfitService,
    WardrobeService,
    CharacterService
  ],
  exports: [
    HomeComponent,
    CharacterComponent,
    WardrobeComponent,
    OutfitComponent
  ]
})
export class HomeModule { }
