import { TestBed } from '@angular/core/testing';

import { VnfService } from './vnf.service';

describe('VnfService', () => {
  let service: VnfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VnfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
