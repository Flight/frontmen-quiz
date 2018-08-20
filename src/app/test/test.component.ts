import { Component, OnInit, Input } from '@angular/core';
import { QuestionService, IQuestion } from '../services/question.service';
import { ScoreboardService } from '../services/scoreboard.service';
import { UserDataService } from '../services/user-data.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeyloggerService } from '../services/keylogger.service';
import { ArrayRandomizerService } from '../services/array-randomizer.service';

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

    public showCorrectAnswer = false;
    public iddqd = false;
    private timerDisabled = false;

    constructor(
        private questionService: QuestionService,
        private userDataService: UserDataService,
        private scoreboardService: ScoreboardService,
        private router: Router,
        private keyloggerService: KeyloggerService,
        private arrayRandomizerService: ArrayRandomizerService
    ) { }

    @HostListener('window:keydown', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (this.testStarted === true && this.testFinished !== true) {
            const keyNumber = Number(event.key);
            const number = isNaN(keyNumber) ? undefined : keyNumber;

            this.keyloggerService.addKey(event.key);

            if (this.keyloggerService.hasWord('iddqd')) {
                this.disableTimer();
                this.keyloggerService.reset();
                this.iddqd = true;
            }

            if (this.keyloggerService.hasWord('idkfa')) {
                this.showCorrectAnswer = true;
                this.keyloggerService.reset();
                this.iddqd = true;
            }

            if (number && number < this.mixedAnswers.length + 1) {
                this.submitAnswer(this.mixedAnswers[number - 1]);
            }
        }
    }

    onUserSubmit() {
        this.testStarted = true;
        this.refreshTimer();
    }

    private disableTimer(): void {
        this.timerDisabled = true;
        this.mainSpinnerProgress = 0;
        this.showQuestionTimer = true;
        clearTimeout(this.questionTimeout);
    }

    private finishTest() {
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

        this.testFinished = true;
        this.showQuestionTimer = false;

        clearTimeout(showScoreTimeout);
        this.userDataService.setScore(this.score);
        this.scoreboardService.addScore(userData);
        showScoreTimer();
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
        this.showQuestionTimer = true;

        clearTimeout(this.questionTimeout);
        mainTimer();
    }

    private onQuestionLoaded(question: IQuestion): void {
        this.question = question;

        if (this.question.type === 'boolean') {
            this.mixedAnswers = ['True', 'False'];
        } else {
            this.mixedAnswers = this.arrayRandomizerService.randomize(
                [this.question.correct_answer, ...this.question.incorrect_answers]
            );
        }

        if (this.testStarted && !this.timerDisabled) {
            this.refreshTimer();
        }
    }

    getNextQuestion(): void {
        this.mixedAnswers = [];

        if (this.questionCounter === 10) {
            this.finishTest();
            return;
        }

        this.questionCounter++;
        this.questionService.getQuestion().subscribe(this.onQuestionLoaded.bind(this));
    }

    checkAnswer(answer: string): boolean {
        return this.question.correct_answer === answer;
    }

    submitAnswer(answer: string): void {
        if (this.checkAnswer(answer)) {
            this.score++;
        }

        this.getNextQuestion();
    }

    ngOnInit() {
        this.testFinished = false;
        this.showCorrectAnswer = false;
        this.timerDisabled = false;
        this.iddqd = false;

        this.keyloggerService.reset();
        this.getNextQuestion();
    }
}
