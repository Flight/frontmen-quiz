import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    userNameInput: FormControl = new FormControl('', [Validators.required]);

    @Output() hasUser = new EventEmitter<boolean>();

    constructor(private userDataService: UserDataService) {
        const name = this.userDataService.getName();

        if (!name || !name.length) {
            return;
        }

        this.userNameInput.setValue(name);
    }

    onNameSubmit() {
        if (!this.userNameInput.valid) {
            return;
        }

        this.userDataService.setName(this.userNameInput.value);
        this.hasUser.emit(true);
    }
}
