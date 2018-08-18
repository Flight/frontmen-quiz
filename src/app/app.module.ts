import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDataService } from './user-data.service';
import { UserComponent } from './user/user.component';
import { TestComponent } from './test/test.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        TestComponent,
        ScoreboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [UserDataService],
    bootstrap: [AppComponent]
})
export class AppModule { }
