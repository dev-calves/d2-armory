import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matDialog: MatDialog;

  class MockMatDialog {
    open(param1, param2): MatDialog {
      return new MatDialog(null, null, null, null, null, null, null);
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide: MatDialog, useClass: MockMatDialog}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    matDialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should launch the dialog box when openDialog is called', () => {
    spyOn(matDialog, 'open');
    expect(matDialog.open).toHaveBeenCalled();
  });
});
