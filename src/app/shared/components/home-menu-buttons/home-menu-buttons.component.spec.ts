import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuButtonsComponent } from './home-menu-buttons.component';

describe('HomeMenuButtonsComponent', () => {
  let component: HomeMenuButtonsComponent;
  let fixture: ComponentFixture<HomeMenuButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMenuButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMenuButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
