import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WardrobeComponent } from './wardrobe.component';

describe('WardrobeComponent', () => {
  let component: WardrobeComponent;
  let fixture: ComponentFixture<WardrobeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WardrobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardrobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
