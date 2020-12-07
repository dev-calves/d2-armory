import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OutfitComponent } from './outfit.component';

describe('OutfitComponent', () => {
  let component: OutfitComponent;
  let fixture: ComponentFixture<OutfitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OutfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
