import { TestBed } from '@angular/core/testing';

import { QuestionTestServiceService } from '../QuestionTestServices/question-test-service.service';

describe('QuestionTestServiceService', () => {
  let service: QuestionTestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionTestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
