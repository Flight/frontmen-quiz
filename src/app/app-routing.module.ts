import { NgModule } from '@angular/core';
import { TestComponent } from '../app/test/test.component';
import { ScoreboardComponent } from '../app/scoreboard/scoreboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: TestComponent
    },
    {
        path: 'scoreboard',
        component: ScoreboardComponent
    },
    {
        path: 'scoreboard/:id',
        component: ScoreboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }
