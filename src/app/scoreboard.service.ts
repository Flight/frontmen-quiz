import { Injectable } from '@angular/core';
import { IUser } from './user-data.service';

@Injectable({
    providedIn: 'root'
})
export class ScoreboardService {
    scores: Array<IUser> = [];

    constructor() { }

    getScores(): Array<IUser> {
        const scores = <Array<IUser>>JSON.parse(localStorage.getItem('scores')) || [];
        return scores;
    }

    addScore(userData: IUser): void {
        this.scores = this.getScores();
        this.scores.push(userData);
        this.scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }
}
