import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MatToolbarModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [
    FooterComponent, MenuComponent, HeaderComponent
  ]
})
export class SharedModule { }
