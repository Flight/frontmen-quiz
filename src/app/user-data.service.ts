import { Injectable } from '@angular/core';

export interface IUser {
    name: string;
    score: number;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private user: IUser;

    constructor() {
        this.user = {
            name: '',
            score: 0,
            id: 0
        };
    }

    get(): IUser {
        return this.user;
    }

    getName(): string {
        if (!this.user || !this.user.name) {
            return;
        }
        return this.user.name;
    }

    setName(userName: string): void {
        this.user.name = userName;
        this.user.id = Math.floor(Math.random() * 1E16);
    }

    setScore(score: number): void {
        this.user.score = score;
    }
}
