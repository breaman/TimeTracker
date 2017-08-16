import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimesheetEntry } from "../../_models/timesheet-entry";
import { Project } from "../../_models/project";
import { ProjectService } from "../../_services/project.service";
import { Store } from "@ngrx/store";
import { ADD_TIME_ENTRY } from "../../_redux/reducer";

@Component({
  selector: 'new-time-entry',
  templateUrl: './new-time-entry.component.html',
  styleUrls: ['./new-time-entry.component.css']
})
export class NewTimeEntryComponent implements OnInit {
  timesheetEntry = new TimesheetEntry();
  description: string;
  project: Project;
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  timer: number | null;
  projects: Project[];
  projectId: number;

  constructor(private projectService: ProjectService, private store: Store<any>) { 
    this.totalSeconds = 0;
    this.timer = null;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.projectId = 0;
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      data => this.projects = data,
      error => console.error('An error occurred', error));
  }

  toggleTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.totalSeconds = 0;
      this.timesheetEntry.endTime = new Date();
      this.timesheetEntry.project = this.projects.find(p => p.id == +this.projectId);
      this.projectId = 0;

      this.store.dispatch({type: ADD_TIME_ENTRY, payload: this.timesheetEntry});

      this.timesheetEntry = new TimesheetEntry();
    }
    else {
      this.timesheetEntry.startTime = new Date();
      this.timer = +setInterval(() => {
        this.totalSeconds++;

        this.hours = Math.floor(this.totalSeconds / 3600);
        this.minutes = Math.floor((this.totalSeconds - (3600 * this.hours)) / 60);
        this.seconds = Math.floor(this.totalSeconds - ((this.minutes * 60) + (3600 * this.hours)));

      }, 1000);
    }
  }
}
