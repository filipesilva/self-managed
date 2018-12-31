import { TestBed } from '@angular/core/testing';

import { TickerService } from './ticker.service';

describe('TickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TickerService = TestBed.get(TickerService);
    expect(service).toBeTruthy();
  });
});
