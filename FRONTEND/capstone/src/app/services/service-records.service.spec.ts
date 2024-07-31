import { TestBed } from '@angular/core/testing';

import { ServiceRecordsService } from './service-records.service';

describe('ServiceRecordsService', () => {
  let service: ServiceRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
