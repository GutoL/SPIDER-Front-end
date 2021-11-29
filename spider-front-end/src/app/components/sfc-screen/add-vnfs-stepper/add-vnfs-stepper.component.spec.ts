import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVnfsStepperComponent } from './add-vnfs-stepper.component';

describe('AddVnfsStepperComponent', () => {
  let component: AddVnfsStepperComponent;
  let fixture: ComponentFixture<AddVnfsStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVnfsStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVnfsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
