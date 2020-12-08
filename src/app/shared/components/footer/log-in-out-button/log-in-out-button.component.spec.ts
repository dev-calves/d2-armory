import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogInOutButtonComponent } from './log-in-out-button.component';

describe('LogInOutButtonComponent', () => {
  let component: LogInOutButtonComponent;
  let fixture: ComponentFixture<LogInOutButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInOutButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInOutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
