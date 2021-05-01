import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
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
  // private _characterId: string;
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

  @Output() miniProfileClick: EventEmitter<any> = new EventEmitter<string>();

  @Output() homeClick: EventEmitter<any> = new EventEmitter<any>();

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

  // @Input()
  // set characterId(characterId: string) {
  //   this._characterId = characterId;
  // }

  // get characterId(): string {
  //   return this._characterId;
  // }

  @ViewChild('buttonProfileContainer')
  set buttonProfileContainer(element) {
    this._buttonProfileContainer = element;
  }

  get buttonProfileContainer() {
    return this._buttonProfileContainer;
  }

  public onHomeClick(): void {
    this.homeClick.emit();
  }

  public onMiniProfileClick(value:any) {
    // const buttons: HTMLCollection = this.buttonProfileContainer.nativeElement.children;

    // Array.from(buttons).forEach(button => {
    //   this.renderer.removeStyle(button, 'background-color');
    // });
    this.miniProfileClick.emit(value);
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
  }

}
