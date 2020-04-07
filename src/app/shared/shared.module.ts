import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MiniProfileComponent } from './components/header/mini-profile/mini-profile.component';
import { AuthModalComponent } from '../shared/components/auth-modal/auth-modal.component';
import { LogInOutButtonComponent } from './components/footer/log-in-out-button/log-in-out-button.component';
import { MenuButtonComponent } from './components/footer/menu-button/menu-button.component';


@NgModule({
  declarations: [
    FooterComponent, AuthModalComponent, HeaderComponent, MiniProfileComponent, LogInOutButtonComponent, MenuButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [
    FooterComponent, HeaderComponent
  ]
})
export class SharedModule { }
