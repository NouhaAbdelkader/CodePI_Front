import { TestBed } from '@angular/core/testing';

import { FileclassserviceService } from './fileclassservice.service';

describe('FileclassserviceService', () => {
  let service: FileclassserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileclassserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
