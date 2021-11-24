import { TestBed } from '@angular/core/testing';

import { SfcRequestService } from './sfc-request.service';

describe('SfcRequestService', () => {
  let service: SfcRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfcRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
