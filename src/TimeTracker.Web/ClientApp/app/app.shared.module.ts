import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, UrlSerializer } from '@angular/router';

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
import { AuthActivatorService } from "./_services/auth-activator.service";
import { LowerCaseUrlSerializer } from "./_providers/lower-case-url-serializer";

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
        TimesheetEntryService,
        AuthActivatorService,
        {provide: UrlSerializer, useClass: LowerCaseUrlSerializer}
    ]
})
export class AppModuleShared {
    constructor(public oidcSecurityService: OidcSecurityService) {
        let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();

        openIDImplicitFlowConfiguration.stsServer = 'http://localhost:5000';
        openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:5000';

        openIDImplicitFlowConfiguration.client_id = 'angular';
        openIDImplicitFlowConfiguration.response_type = 'id_token token';
        openIDImplicitFlowConfiguration.scope = 'openid profile';
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:5000';
        openIDImplicitFlowConfiguration.start_checksession = false;
        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
        openIDImplicitFlowConfiguration.silent_renew = true;

        openIDImplicitFlowConfiguration.startup_route = '/';

        openIDImplicitFlowConfiguration.log_console_warning_active = true;
        openIDImplicitFlowConfiguration.log_console_debug_active = true;

        this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
    }
}