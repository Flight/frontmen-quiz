import { TestBed, inject } from '@angular/core/testing';

import { ArrayRandomizerService } from './array-randomizer.service';

describe('ArrayRandomizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayRandomizerService]
    });
  });

  it('should be created', inject([ArrayRandomizerService], (service: ArrayRandomizerService) => {
    expect(service).toBeTruthy();
  }));
});
