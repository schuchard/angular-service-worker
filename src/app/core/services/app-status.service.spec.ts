import { TestBed, inject } from '@angular/core/testing';

import { AppStatusService } from './app-status.service';

describe('AppStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStatusService]
    });
  });

  it('should be created', inject([AppStatusService], (service: AppStatusService) => {
    expect(service).toBeTruthy();
  }));
});
