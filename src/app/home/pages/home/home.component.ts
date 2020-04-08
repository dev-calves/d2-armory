import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ObservableInput, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _code: string = "";
  private _state: string = "";
  private _service$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router/*,
    private service: add the service here after creation.*/) { }

  ngOnInit() {
    // initialize /home:/:state route
    this._service$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap): ObservableInput<any> => {
        this.code = params.get('code');
        this.state = params.get('state');
        return null;
      })
    );
  }

  public get code(): string {
    return this._code;
  }

  public set code(code: string) {
    this._code = code;
  }

  public get state(): string {
    return this._state;
  }

  public set state(state: string) {
    this._state = state;
  }

  ngOnDestroy() {
    //this._service$.unsubscribe();
  }

}
