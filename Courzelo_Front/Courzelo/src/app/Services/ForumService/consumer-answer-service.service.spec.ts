import { TestBed } from '@angular/core/testing';

import { ConsumerAnswerServiceService } from './consumer-answer-service.service';

describe('ConsumerAnswerServiceService', () => {
  let service: ConsumerAnswerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerAnswerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
