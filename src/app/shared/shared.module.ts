import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/footer/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { CharacterStatsComponent } from './components/header/character-stats/character-stats.component';


@NgModule({
  declarations: [
    FooterComponent, MenuComponent, HeaderComponent, CharacterStatsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent, MenuComponent, HeaderComponent, CharacterStatsComponent
  ]
})
export class SharedModule { }
