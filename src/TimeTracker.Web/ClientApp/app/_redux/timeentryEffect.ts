import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Actions, Effect } from "@ngrx/effects";
import { ADD_TIME_ENTRY, ActionWithPayload } from "./reducer";
import { TimesheetEntry } from "../_models/timesheet-entry";
import { of } from "rxjs/observable/of";

@Injectable()
export class TimeentryEffects {
    constructor(private http: Http, private actions$: Actions) {}

    @Effect() addTimeentry$ = this.actions$
        .ofType(ADD_TIME_ENTRY)
        .map((action: ActionWithPayload<TimesheetEntry>) => JSON.stringify(action.payload))
        .switchMap(payload => this.http.post('/api/nothing', payload)
            .map(res => ({type: 'NOTHING_SUCCESS', payload: res.json()}))
            .catch(() => of({type: 'NOTHING_ERROR'}))
    );
}