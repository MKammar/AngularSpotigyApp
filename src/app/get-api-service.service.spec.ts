import { TestBed } from '@angular/core/testing';

import { GetApiServiceService } from './get-api-service.service';

describe('GetApiServiceService', () => {
  let service: GetApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
