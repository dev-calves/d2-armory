import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniProfileComponent } from './mini-profile.component';

import { mockCharacter } from './mocks/mock-character';

describe('MiniProfileComponent', () => {
  let component: MiniProfileComponent;
  let fixture: ComponentFixture<MiniProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize character', () => {
    component.character = mockCharacter;
    expect(component.character.class).toContain('C');
  });
});
