import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterDisplayComponent } from './character-display.component';

describe('CharacterDisplayComponent', () => {
  let component: CharacterDisplayComponent;
  let fixture: ComponentFixture<CharacterDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
