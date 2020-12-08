import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthModalComponent } from './auth-modal.component';

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;
  let matDialogRef: MatDialogRef<AuthModalComponent>;

  class MockMatDialogRef<AuthModalComponent> {
    close(): void {}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthModalComponent ],
      providers: [ {provide: MatDialogRef, useClass: MockMatDialogRef} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    matDialogRef = TestBed.inject(MatDialogRef);
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog box when onClick is called', () => {
    spyOn(matDialogRef, 'close');
    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
