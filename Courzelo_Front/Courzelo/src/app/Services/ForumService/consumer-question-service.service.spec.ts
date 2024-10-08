import { TestBed } from '@angular/core/testing';

import { ConsumerQuestionServiceService } from './consumer-question-service.service';

describe('ConsumerQuestionServiceService', () => {
  let service: ConsumerQuestionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerQuestionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
