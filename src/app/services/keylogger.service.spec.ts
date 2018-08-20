import { TestBed, inject } from '@angular/core/testing';

import { KeyloggerService } from './keylogger.service';

describe('KeyloggerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [KeyloggerService]
        });
    });

    it('should be created', inject([KeyloggerService], (service: KeyloggerService) => {
        expect(service).toBeTruthy();
    }));
});
