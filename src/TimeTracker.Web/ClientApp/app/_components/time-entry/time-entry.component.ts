import { Component, OnInit } from '@angular/core';
import { TimesheetEntry } from "../../_models/timesheet-entry";
import { TimesheetEntryService } from "../../_services/timesheet-entry.service";

@Component({
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent implements OnInit {

  timesheetEntries: TimesheetEntry[];
  timesheetEntry: TimesheetEntry;

  constructor(private timesheetEntryService: TimesheetEntryService) { }

  ngOnInit() {
    this.timesheetEntryService.getTimesheetEntries().subscribe(
      data => {
        this.timesheetEntries = data;
        for (let entry of this.timesheetEntries) {
          entry.endTime = new Date(entry.endTime);
          entry.startTime = new Date(entry.startTime);
        }
      },
      error => console.error('An error occurred.', error)
    );
  }

  saveEntry(entry: TimesheetEntry) {
    this.timesheetEntryService.insertTimesheetEntry(entry).subscribe(
      (data : TimesheetEntry) => {
        data.endTime = new Date(data.endTime);
        data.startTime = new Date(data.startTime);
        this.timesheetEntries.splice(0, 0, data)
      },
      error => console.error('An error occurred.', error)
    );
  }

}
