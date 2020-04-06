import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matDialog: MatDialog;

  class MockMatDialog {
    open(any, object): MatDialog {
      return new MatDialog(null, null, null, null, null, null, null);
    }
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide:MatDialog, useClass: MockMatDialog}]
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
    component.openDialog();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
