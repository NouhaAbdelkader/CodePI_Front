import { TestBed } from '@angular/core/testing';

import { QuestionfeedbackService } from './questionfeedback.service';

describe('QuestionfeedbackService', () => {
  let service: QuestionfeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionfeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
