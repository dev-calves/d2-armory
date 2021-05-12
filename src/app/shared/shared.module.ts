import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MiniProfileComponent } from './components/header/mini-profile/mini-profile.component';
import { AuthModalComponent } from '../shared/components/auth-modal/auth-modal.component';
import { LogInOutButtonComponent } from './components/footer/log-in-out-button/log-in-out-button.component';
import { MenuButtonComponent } from './components/footer/menu-button/menu-button.component';
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';


@NgModule({
  declarations: [
    FooterComponent, 
    AuthModalComponent, 
    HeaderComponent, 
    MiniProfileComponent, 
    LogInOutButtonComponent, 
    MenuButtonComponent, 
    OverlaySpinnerComponent
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
    FlexLayoutModule,
    RouterModule
  ],
  providers: [],
  exports: [
    FooterComponent, HeaderComponent, OverlaySpinnerComponent
  ]
})
export class SharedModule { }
