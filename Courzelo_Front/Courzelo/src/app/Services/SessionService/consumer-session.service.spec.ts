import { TestBed } from '@angular/core/testing';

import { ConsumerSessionService } from './consumer-session.service';

describe('ConsumerSessionService', () => {
  let service: ConsumerSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
