import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {AuthModule, OpenIDImplicitFlowConfiguration, OidcSecurityService} from 'angular-auth-oidc-client';

import { appRoutes } from "./_routes/routes";

import { AppComponent } from './_components/app/app.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { HomeComponent } from './_components/home/home.component';
import { NewTimeEntryComponent } from './_components/new-time-entry/new-time-entry.component';
import { TimeEntryListComponent } from './_components/time-entry-list/time-entry-list.component';
import { TimeEntryComponent } from './_components/time-entry/time-entry.component';
import { Error404Component } from './_components/error404/error404.component';
import { FormatTimespanPipe } from "./_pipes/format-timespan.pipe";
import { ProjectService } from "./_services/project.service";
import { TimesheetEntryService } from "./_services/timesheet-entry.service";

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        HomeComponent,
        NewTimeEntryComponent,
        TimeEntryListComponent,
        TimeEntryComponent,
        Error404Component,
        FormatTimespanPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        AuthModule.forRoot()
    ],
    providers: [
        OidcSecurityService,
        ProjectService,
        TimesheetEntryService
    ]
})
export class AppModuleShared {
}