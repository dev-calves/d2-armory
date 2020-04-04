import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthModalComponent } from './auth-modal.component';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  class MockMatDialogRef<AuthModalComponent> {
    close(): void {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthModalComponent ],
      providers: [ {provide: MatDialogRef, useClass: MockMatDialogRef} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
