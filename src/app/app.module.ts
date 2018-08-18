import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDataService } from './user-data.service';
import { ScoreboardService } from './scoreboard.service';
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
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        UserDataService,
        ScoreboardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
