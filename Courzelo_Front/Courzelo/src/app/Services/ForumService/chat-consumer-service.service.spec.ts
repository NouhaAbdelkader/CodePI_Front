import { TestBed } from '@angular/core/testing';

import { ChatConsumerServiceService } from './chat-consumer-service.service';

describe('ChatConsumerServiceService', () => {
  let service: ChatConsumerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatConsumerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
