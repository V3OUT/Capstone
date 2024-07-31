import { TestBed } from '@angular/core/testing';

import { WorkitemsService } from './workitems.service';

describe('WorkitemsService', () => {
  let service: WorkitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
