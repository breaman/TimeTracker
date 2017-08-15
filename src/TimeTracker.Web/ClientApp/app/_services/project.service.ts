import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Project } from "../_models/project";

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getProjects(): Observable<Project[]> {
    return this.http.get('/api/project').map(res => res.json() as Project[]);
  }
}
