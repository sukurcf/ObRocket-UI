import { TestBed } from '@angular/core/testing';

import { ProcessBasketService } from './process-basket.service';

describe('ProcessBasketService', () => {
  let service: ProcessBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
