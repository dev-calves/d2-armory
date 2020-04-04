import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/footer/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MiniProfileComponent } from './components/header/mini-profile/mini-profile.component';


@NgModule({
  declarations: [
    FooterComponent, MenuComponent, HeaderComponent, MiniProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [
    FooterComponent, MenuComponent, HeaderComponent
  ]
})
export class SharedModule { }
