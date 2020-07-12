import { Injectable } from '@angular/core';
import { LogInOutButtonComponent } from 'src/app/shared/components/footer/log-in-out-button/log-in-out-button.component';
import { EncryptService } from '../apis/encrypt/encrypt.service';
import { EncryptRequest } from '../../models/api/encrypt-request.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LogInOutButtonService {

  constructor(private encryptService: EncryptService) { }

  public encryptStateAndLinkToBungie(logInOutButtonRef: LogInOutButtonComponent): void {
    let encryptRequest: EncryptRequest;

    if (localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) &&
      localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'vault' ||
      localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) === 'inventory') {
      encryptRequest = { state: localStorage.getItem(environment.LOCAL_STORAGE_STORAGE) };
    } else {
      encryptRequest = { state: 'vault' };
    }

    logInOutButtonRef.encryptSub = this.encryptService.postEncrypt(encryptRequest).subscribe(
      response => {
        logInOutButtonRef.stateHex = response.hex;
        logInOutButtonRef.bungieAuthUrl = 'https://www.bungie.net/en/oauth/authorize?client_id=' +
          response.bungieClientId + '&response_type=code&state=' + logInOutButtonRef.stateHex;

        if (localStorage.getItem(environment.LOCAL_STORAGE_DISMISS_LOGON_MESSAGE) === 'true') {
          localStorage.setItem(environment.LOCAL_STORAGE_STATE, logInOutButtonRef.stateHex);
          location.href = logInOutButtonRef.bungieAuthUrl;
        } else {
          logInOutButtonRef.openDialog(logInOutButtonRef.stateHex, logInOutButtonRef.bungieAuthUrl);
        }
      }
    );
  }
}
