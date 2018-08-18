import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    userName = new FormControl('', [Validators.required]);

    constructor(private userDataService: UserDataService) {
    }
    onNameSubmit() {
        if (this.userName === undefined) {
            return;
        }
        this.userDataService.setName(this.userName.value);
    }
}
