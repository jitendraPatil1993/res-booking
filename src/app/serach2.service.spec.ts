import { TestBed } from '@angular/core/testing';

import { Serach2Service } from './serach2.service';

describe('Serach2Service', () => {
  let service: Serach2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serach2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
