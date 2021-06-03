import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private _loggedIn: boolean;

  constructor() { }

  public set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }
  public get loggedIn() {
    return this._loggedIn;
  }
}
