import { TestBed } from '@angular/core/testing';

import { QAnswerService } from './qanswer.service';

describe('QAnswerService', () => {
  let service: QAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
