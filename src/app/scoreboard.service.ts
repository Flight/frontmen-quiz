import { Injectable } from '@angular/core';
import { IUser } from './user-data.service';

@Injectable({
    providedIn: 'root'
})
export class ScoreboardService {
    scores: Array<IUser> = [];

    constructor() { }

    getScores(): Array<IUser> {
        return <Array<IUser>>JSON.parse(localStorage.getItem('scores')) || [];
    }

    addScore(userData: IUser): void {
        this.scores = this.getScores();

        console.log(userData);
        this.scores.push(userData);
        this.scores.sort((a, b) => a.score - b.score);
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }
}
