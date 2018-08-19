import { Component, OnInit, Input } from '@angular/core';
import { QuestionService, IQuestion } from '../question.service';
import { ScoreboardService } from '../scoreboard.service';
import { UserDataService } from '../user-data.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    @Input() hasUser: boolean;

    private questionTimeout;
    private questionCounter = 0;

    public question: IQuestion;
    public testStarted = false;
    public mixedAnswers = [];
    public testFinished = false;
    public score = 0;
    public finalSpinnerProgress = 0;
    public showTimeEndMessage = false;
    public showQuestionTimer = false;

    public showMainSpinner = false;
    public mainSpinnerProgress = 0;

    constructor(
        private questionService: QuestionService,
        private userDataService: UserDataService,
        private scoreboardService: ScoreboardService,
        private router: Router
    ) { }

    @HostListener('window:keydown', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (this.testStarted === true && this.testFinished !== true) {
            const keyNumber = parseInt(event.key, 10);
            const number = isNaN(keyNumber) ? undefined : keyNumber;

            if (number && number < this.mixedAnswers.length + 1) {
                this.checkAnswer(this.mixedAnswers[number - 1]);
            }
        }
    }

    onUserSubmit() {
        this.testStarted = true;
        this.refreshTimer();
    }

    finishTest() {
        const finalTimeout = 3000;
        const userData = this.userDataService.get();
        let showScoreTimeout;
        const showScoreTimer = () => {
            if (this.finalSpinnerProgress === 110) {
                clearTimeout(showScoreTimeout);
                this.router.navigate(['scoreboard', userData.id]);
                return;
            }
            this.finalSpinnerProgress++;

            showScoreTimeout = setTimeout(showScoreTimer, finalTimeout / 100);
        };

        clearTimeout(showScoreTimeout);

        this.testFinished = true;
        this.showQuestionTimer = false;

        this.userDataService.setScore(this.score);
        this.scoreboardService.addScore(userData);

        showScoreTimer();
    }

    private makeRandomArray(array: Array<any>): Array<any> {
        return array.sort(function() {
            return 0.5 - Math.random();
        });
    }

    private onTimeEnd(): void {
        this.showQuestionTimer = false;
        this.showTimeEndMessage = true;

        setTimeout((): void => {
            this.showTimeEndMessage = false;
            this.getNextQuestion();
        }, 5000);
    }

    private refreshTimer(): void {
        const questionTimeoutTime = 30000;
        const mainTimer = () => {
            if (this.mainSpinnerProgress === 101) {
                this.onTimeEnd();
                clearTimeout(this.questionTimeout);
                return;
            }
            this.mainSpinnerProgress++;

            this.questionTimeout = setTimeout(mainTimer, questionTimeoutTime / 100);
        };

        this.mainSpinnerProgress = 0;

        clearTimeout(this.questionTimeout);

        this.showQuestionTimer = true;

        mainTimer();
    }

    getNextQuestion(): void {
        this.mixedAnswers = [];

        if (this.questionCounter === 10) {
            this.finishTest();
            return;
        }

        this.questionCounter++;

        this.questionService.getQuestion().subscribe((question: IQuestion): void => {
            this.question = question;

            if (this.question.type === 'boolean') {
                this.mixedAnswers = ['True', 'False'];
            } else {
                this.mixedAnswers = this.makeRandomArray([this.question.correct_answer, ...this.question.incorrect_answers]);
            }

            if (this.testStarted) {
                this.refreshTimer();
            }
        });
    }

    checkAnswer(answer: string): void {
        if (this.question.correct_answer === answer) {
            this.score++;
        }
        this.getNextQuestion();
    }

    ngOnInit() {
        this.getNextQuestion();
    }
}
