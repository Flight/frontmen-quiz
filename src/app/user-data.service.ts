import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private userName: string;

    constructor() { }

    getName(): string {
        return this.userName;
    }

    setName(userName: string): void {
        this.userName = userName;
    }
}
