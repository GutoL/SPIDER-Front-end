import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVnfComponent } from './create-vnf.component';

describe('CreateVnfComponent', () => {
  let component: CreateVnfComponent;
  let fixture: ComponentFixture<CreateVnfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVnfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
