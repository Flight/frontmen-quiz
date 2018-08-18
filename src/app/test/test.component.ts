import { Component, OnInit } from '@angular/core';
import { QuestionService, IQuestion } from '../question.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    private question: IQuestion;

    constructor(private questionService: QuestionService) { }

    ngOnInit() {
        this.questionService.getQuestion().subscribe((question: IQuestion): void => {
            this.question = question;
        });
    }

}
