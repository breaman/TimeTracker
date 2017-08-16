import {Action} from '@ngrx/store';
import { TimesheetEntry } from "../_models/timesheet-entry";

export const ADD_TIME_ENTRY = 'ADD_TIME_ENTRY';

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function timeentryReducer(state = [], action: ActionWithPayload<TimesheetEntry>) {
    switch (action.type) {
        case ADD_TIME_ENTRY:
            return [action.payload, ...state];
        default:
            return state;
    }
}