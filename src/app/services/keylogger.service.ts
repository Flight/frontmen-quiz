import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class KeyloggerService {
    private keys: Array<string> = [];
    constructor() { }

    public addKey(key: string) {
        this.keys.push(key);
    }

    public getKeys(): Array<string> {
        return this.keys;
    }

    public reset() {
        this.keys = [];
    }

    public hasWord(word: string): boolean {
        return this.keys.join('').toLowerCase().search(word) !== -1;
    }
}
