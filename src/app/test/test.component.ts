import { Component, OnInit, Input } from '@angular/core';
import { QuestionService, IQuestion } from '../question.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    @Input() hasUser: boolean;

    public question: IQuestion;
    public showQuestion = false;
    public mixedAnswers = [];
    public testFinished = false;
    public score = 0;
    private questionCounter = 0;

    constructor(private questionService: QuestionService) { }

    onUserSubmit() {
        this.showQuestion = true;
    }

    finishTest() {
        this.testFinished = true;
    }

    getNextQuestion(): void {
        this.mixedAnswers = [];

        if (this.questionCounter === 10) {
            this.finishTest();
        }

        this.questionCounter++;

        this.questionService.getQuestion().subscribe((question: IQuestion): void => {
            this.question = question;

            if (this.question.type !== 'boolean') {
                this.mixedAnswers.push(this.question.correct_answer, ...this.question.incorrect_answers);
            }
        });
    }

    checkAnswer(answer: string): void {
        if (this.question.correct_answer === answer) {
            this.score++;
        }
        this.getNextQuestion();
    }

    makeRandomArray(array: Array<any>): Array<any> {
        return array.sort(function() {
            return 0.5 - Math.random();
        });
    }

    ngOnInit() {
        this.getNextQuestion();
    }
}
