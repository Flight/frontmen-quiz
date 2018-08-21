import { TestBed, inject } from '@angular/core/testing';

import { ArrayRandomizerService } from './array-randomizer.service';

describe('ArrayRandomizerService', (): void => {
    const array = ['1', '2', '3'];
    const emptyArray = [];

    beforeEach((): void => {
        TestBed.configureTestingModule({
            providers: [ArrayRandomizerService]
        });
    });

    it('should be created', inject([ArrayRandomizerService], (service: ArrayRandomizerService): void => {
        expect(service).toBeTruthy();
    }));

    it('should return with the same elements', inject([ArrayRandomizerService], (service: ArrayRandomizerService): void => {
        const randomizedArray = service.randomize(array);

        expect(randomizedArray).toBeDefined();
        expect(randomizedArray.length).toBe(3);
        expect(randomizedArray).toEqual(jasmine.arrayContaining(['1', '2', '3']));
    }));

    it('should return empty array if gets an empty one', inject([ArrayRandomizerService], (service: ArrayRandomizerService): void => {
        const randomizedArray = service.randomize(emptyArray);

        expect(randomizedArray).toBeDefined();
        expect(randomizedArray.length).toBe(0);
    }));
});
