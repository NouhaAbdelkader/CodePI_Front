import { TestBed } from '@angular/core/testing';

import { CandidancyService } from './candidancy.service';

describe('CandidancyService', () => {
  let service: CandidancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
