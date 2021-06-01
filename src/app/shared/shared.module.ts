import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FooterComponent } from './components/footer/footer.component';
import { CharacterDisplayComponent } from './components/character-display/character-display.component';
import { MiniProfileComponent } from './components/character-display/mini-profile/mini-profile.component';
import { AuthModalComponent } from '../shared/components/auth-modal/auth-modal.component';
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeMenuButtonsComponent } from './components/home-menu-buttons/home-menu-buttons.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent, 
    AuthModalComponent, 
    CharacterDisplayComponent, 
    MiniProfileComponent,
    OverlaySpinnerComponent, 
    HomeMenuButtonsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    FlexLayoutModule,
    RouterModule
  ],
  providers: [],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    CharacterDisplayComponent, 
    OverlaySpinnerComponent, 
    HomeMenuButtonsComponent
  ]
})
export class SharedModule { }
