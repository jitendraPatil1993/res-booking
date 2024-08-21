import { TestBed } from '@angular/core/testing';

import { YourServiceService } from './your-service.service';

describe('YourServiceService', () => {
  let service: YourServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
