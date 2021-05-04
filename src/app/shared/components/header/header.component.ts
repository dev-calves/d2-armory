import { Component, Input, Output, EventEmitter, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  private _loggedIn: boolean;
  private _characters: ICharacter[];
  private _buttonProfileContainer: ElementRef;
  private _characterButtonSelected: Element;

  constructor(private renderer: Renderer2, private route: ActivatedRoute) { }

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

  @ViewChild('buttonProfileContainer')
  set buttonProfileContainer(element: ElementRef) {
    this._buttonProfileContainer = element;
  }

  get buttonProfileContainer() {
    return this._buttonProfileContainer;
  }

  public onHomeClick(): void {
    if (this._characterButtonSelected) {
      this.renderer.removeStyle(this._characterButtonSelected, 'background-color');
    }

    this.homeClick.emit();
  }

  public onMiniProfileClick(value:any) {
    const buttons: HTMLCollection = this.buttonProfileContainer.nativeElement.children;

    if (this._characterButtonSelected) {
      this.renderer.removeStyle(this._characterButtonSelected, 'background-color');
    }

    this._characterButtonSelected = Array.from(buttons).find(button => button.id === value);
    this.renderer.setStyle(this._characterButtonSelected, 'background-color', 'beige');

    this.miniProfileClick.emit(value);
  }

  ngOnDestroy() { }

}
