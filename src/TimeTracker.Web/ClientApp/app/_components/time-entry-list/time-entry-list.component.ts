import { Component, OnInit, Input } from '@angular/core';
import { TimesheetEntry } from "../../_models/timesheet-entry";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.css']
})
export class TimeEntryListComponent implements OnInit {
  timesheetEntries$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.timesheetEntries$ = this.store.select('timeentryReducer');
  }
}
