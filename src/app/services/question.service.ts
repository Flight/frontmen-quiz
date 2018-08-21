import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface IQuestionsData {
    response_code: number;
    results?: Array<IQuestion>;
}

export interface IQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers?: Array<string>;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    questions: Array<IQuestion> = [];

    constructor(private http: HttpClient) { }

    private getQuestionsData(): Observable<IQuestionsData> {
        return this.http.get<IQuestionsData>('https://opentdb.com/api.php?amount=10');
    }

    private getQuestions(): Observable<IQuestion[]> {
        if (this.questions.length !== 0) {
            return of(this.questions);
        }

        return this.getQuestionsData().pipe(
            map((questionsData: IQuestionsData): IQuestion[] => {
                if (questionsData && questionsData.results && questionsData.results.length) {
                    this.questions = questionsData.results;

                    return this.questions;
                } else {
                    throw new Error('Questions API has no questions.');
                }
            }),
            catchError((error: Error): Observable<any> => {
                if (error && error.message && error.message && error.name !== 'HttpErrorResponse') {
                    return throwError(error.message);
                }
                return throwError('Questions API is unavailable.');
            })
        );
    }

    getQuestion(): Observable<IQuestion> {
        return this.getQuestions().pipe(
            map((questions: Array<IQuestion>): IQuestion => {
                return questions.shift();
            })
        );
    }
}
