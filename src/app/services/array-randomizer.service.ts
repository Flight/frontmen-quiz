import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ArrayRandomizerService {
    public randomize(array: Array<any>): Array<any> {
        return array.sort(function() {
            return 0.5 - Math.random();
        });
    }
}
