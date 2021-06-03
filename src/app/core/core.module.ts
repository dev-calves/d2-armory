import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CurrentMembershipService, 
  EquipmentService, 
  LocalStorageService, 
  LoggedInService, 
  OverlaySpinnerService 
} from './services';
import { TransferStorageService } from './services';
import { HomeClickService } from './services/home-click/home-click.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EquipmentService,
    OverlaySpinnerService,
    TransferStorageService,
    CurrentMembershipService,
    HomeClickService,
    LoggedInService,
    LocalStorageService
  ]
})
export class CoreModule {
  contructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module.');
    }
  }
}
