import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    userName = new FormControl('', [Validators.required]);

    constructor() {
    }
    proceedToTest() {
        console.log('test');
    }
}
