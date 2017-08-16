import {Routes} from '@angular/router';
import { TimeEntryComponent } from "../_components/time-entry/time-entry.component";
import { HomeComponent } from "../_components/home/home.component";
import { Error404Component } from "../_components/error404/error404.component";
import { AuthActivatorService } from "../_services/auth-activator.service";

export const appRoutes: Routes =[
    {path: 'timeentry', component: TimeEntryComponent, canActivate: [AuthActivatorService] },
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: '**', component: Error404Component}
]