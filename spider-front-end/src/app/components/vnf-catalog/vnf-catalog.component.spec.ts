import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnfCatalogComponent } from './vnf-catalog.component';

describe('VnfCatalogComponent', () => {
  let component: VnfCatalogComponent;
  let fixture: ComponentFixture<VnfCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VnfCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VnfCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
