import { TestBed } from '@angular/core/testing';

import { ServicescustomvalidationService } from './servicescustomvalidation.service';

describe('ServicescustomvalidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicescustomvalidationService = TestBed.get(ServicescustomvalidationService);
    expect(service).toBeTruthy();
  });
});
