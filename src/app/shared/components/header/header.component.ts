import { Component, Input, Renderer2, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked {
  private _characters: ICharacter[];
  private _buttonProfileContainer;
  private _queryParamsSub: Subscription;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) { }

  ngAfterViewChecked() {
    this._queryParamsSub = this.route.queryParams.subscribe(params => {
      if (params?.id) {
        let buttons: HTMLCollection = this._buttonProfileContainer.nativeElement.children;
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
