import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceNodeDialogComponent } from './replace-node-dialog.component';

describe('ReplaceNodeDialogComponent', () => {
  let component: ReplaceNodeDialogComponent;
  let fixture: ComponentFixture<ReplaceNodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceNodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceNodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
