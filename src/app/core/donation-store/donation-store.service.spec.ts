import { TestBed } from '@angular/core/testing';

import { DonationStoreService } from './donation-store.service';

describe('DonationStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonationStoreService = TestBed.get(DonationStoreService);
    expect(service).toBeTruthy();
  });
});
