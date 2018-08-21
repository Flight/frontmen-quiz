/// <reference types="@types/jasmine-ajax" />

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { QuestionService, IQuestion } from './question.service';

describe('QuestionService', (): void => {
    const dataUrl = 'https://opentdb.com/api.php?amount=10';
    const firstQuestion = {
        'category': 'Geography',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'Which country inside the United Kingdom does NOT appear on its flag, the Union Jack?',
        'correct_answer': 'Wales',
        'incorrect_answers': [
            'Scotland',
            'Ireland',
            'Isle of Wight'
        ]
    };
    const secondQuestion = {
        'category': 'Geography',
        'type': 'multiple',
        'difficulty': 'hard',
        'question': 'Which of these island countries is located in the Caribbean?',
        'correct_answer': 'Barbados',
        'incorrect_answers': [
            'Fiji',
            'Maldives',
            'Seychelles'
        ]
    };
    const data = {
        'response_code': 0,
        'results': [
            firstQuestion,
            secondQuestion,
            firstQuestion,
            secondQuestion,
            firstQuestion,
            secondQuestion,
            firstQuestion,
            secondQuestion,
            firstQuestion,
            secondQuestion
        ]
    };

    beforeEach((): void => {
        jasmine.Ajax.install();

        jasmine.Ajax.stubRequest(dataUrl).andReturn({
            'responseText': JSON.stringify(data)
        });

        TestBed.configureTestingModule({
            providers: [QuestionService],
            imports: [HttpClientModule]
        });
    });

    afterEach((): void => {
        jasmine.Ajax.uninstall();
    });

    it('should be created', inject([QuestionService], (service: QuestionService): void => {
        expect(service).toBeTruthy();
    }));

    it('should get data from the right url', inject([QuestionService], (service: QuestionService): void => {
        service.getQuestion().subscribe((question: IQuestion): void => {
            expect(jasmine.Ajax.requests.count()).toBe(1);
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(dataUrl);
        });
    }));

    it('should get corrent question', inject([QuestionService], (service: QuestionService): void => {
        service.getQuestion().subscribe((question: IQuestion): void => {
            expect(question).toEqual(firstQuestion);
        });
        service.getQuestion().subscribe((question: IQuestion): void => {
            expect(question).toEqual(secondQuestion);
        });
    }));

    it('should get corrent question', inject([QuestionService], (service: QuestionService): void => {
        service.getQuestion().subscribe((question: IQuestion): void => {
            expect(question).toEqual(firstQuestion);
        });
        service.getQuestion().subscribe((question: IQuestion): void => {
            expect(question).toEqual(secondQuestion);
        });
    }));

    it('should trow error if API is unavailable', inject([QuestionService], (service: QuestionService): void => {
        let error = null;

        jasmine.Ajax.stubRequest(dataUrl).andReturn({
            status: 404
        });

        try {
            service.getQuestion().subscribe();
        } catch (e) {
            error = e;
        }

        setTimeout(() => {
            expect(error).toBe('Questions API is unavailable.');
        }, 0);
    }));
});
