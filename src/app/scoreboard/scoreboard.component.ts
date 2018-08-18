import { Component, OnInit } from '@angular/core';
import { UserDataService, IUser } from '../user-data.service';
import { ScoreboardService } from '../scoreboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
    public scores: Array<IUser>;
    public displayedColumns: string[] = ['name', 'score'];
    public dataSource;
    public userId: number;

    constructor(
        private userDataService: UserDataService,
        private scoreboardService: ScoreboardService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => this.userId = parseInt(params.id, 10));
    }

    ngOnInit() {
        this.scores = this.scoreboardService.getScores();
        this.dataSource = new MatTableDataSource<IUser>(this.scores);
    }
}
