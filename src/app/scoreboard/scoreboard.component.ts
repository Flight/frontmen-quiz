import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
    constructor(private userDataService: UserDataService) { }

    ngOnInit() {
        console.log(this.userDataService.getName());
    }
}
