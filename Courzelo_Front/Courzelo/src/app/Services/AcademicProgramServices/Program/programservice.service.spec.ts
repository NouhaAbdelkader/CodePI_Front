import { TestBed } from '@angular/core/testing';

import { ProgramserviceService } from './programservice.service';

describe('ProgramserviceService', () => {
  let service: ProgramserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
