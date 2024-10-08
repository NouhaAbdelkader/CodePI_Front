import { TestBed } from '@angular/core/testing';

import { VoteConsumerService } from './vote-consumer.service';

describe('VoteConsumerService', () => {
  let service: VoteConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
