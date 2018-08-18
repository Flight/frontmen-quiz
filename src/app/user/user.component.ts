import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    @Output() hasUser = new EventEmitter<boolean>();

    private userName: FormControl = new FormControl('', [Validators.required]);

    constructor(private userDataService: UserDataService) { }

    onNameSubmit() {
        if (!this.userName.valid) {
            return;
        }
        this.userDataService.setName(this.userName.value);
        this.hasUser.emit();
    }
}
