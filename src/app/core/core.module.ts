import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentService, OverlaySpinnerService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EquipmentService,
    OverlaySpinnerService
  ]
})
export class CoreModule {
  contructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module.');
    }
  }
}
