import { TestBed } from '@angular/core/testing';

import { LogQueryService } from './log-query.service';

describe('LogQueryService', () => {
  let service: LogQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
