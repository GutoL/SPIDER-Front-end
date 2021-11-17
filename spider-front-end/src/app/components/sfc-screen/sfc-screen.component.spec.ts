import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcScreenComponent } from './sfc-screen.component';

describe('SfcScreenComponent', () => {
  let component: SfcScreenComponent;
  let fixture: ComponentFixture<SfcScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfcScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
