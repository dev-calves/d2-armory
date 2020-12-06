import { Component, Input, Renderer2, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked, OnDestroy {
  private _loggedIn: boolean;
  private _characters: ICharacter[];
  private _buttonProfileContainer;
  private _queryParamsSub: Subscription;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) { }

  ngAfterViewChecked() {
    this._queryParamsSub = this.route.queryParams.subscribe(params => {
      if (params?.id) {
        const buttons: HTMLCollection = this._buttonProfileContainer.nativeElement.children;
        Array.from(buttons).forEach((button: HTMLElement) => {
          if (button.id === params.id) {
            this.renderer.setStyle(button, 'background-color', 'beige');
          }
        });
      }
    });
  }

  @Input()
  set characters(chars: ICharacter[]) {
    this._characters = chars;
  }

  get characters(): ICharacter[] {
    return this._characters;
  }

  @Input()
  set loggedIn(loggedIn: boolean) {
    this._loggedIn = loggedIn;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  @ViewChild('buttonProfileContainer')
  set buttonProfileContainer(element) {
    this._buttonProfileContainer = element;
  }

  get buttonProfileContainer() {
    return this._buttonProfileContainer;
  }

  public removeHighlights() {
    const buttons: HTMLCollection = this.buttonProfileContainer.nativeElement.children;

    Array.from(buttons).forEach(button => {
      this.renderer.removeStyle(button, 'background-color');
    });
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
  }

}
