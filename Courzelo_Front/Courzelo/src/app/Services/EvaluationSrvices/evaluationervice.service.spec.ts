import { TestBed } from '@angular/core/testing';

import { EvaluationerviceService } from './evaluationervice.service';

describe('EvaluationerviceService', () => {
  let service: EvaluationerviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationerviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
