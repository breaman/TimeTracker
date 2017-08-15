import {Routes} from '@angular/router';
import { TimeEntryComponent } from "../_components/time-entry/time-entry.component";
import { HomeComponent } from "../_components/home/home.component";
import { Error404Component } from "../_components/error404/error404.component";

export const appRoutes: Routes =[
    {path: 'timeEntry', component: TimeEntryComponent},
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: '**', component: Error404Component}
]