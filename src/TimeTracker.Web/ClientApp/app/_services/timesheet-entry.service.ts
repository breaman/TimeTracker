import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { TimesheetEntry } from "../_models/timesheet-entry";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable()
export class TimesheetEntryService {
    constructor(private http: Http, private securityService: OidcSecurityService) {}

    

    getTimesheetEntries(): Observable<TimesheetEntry[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.securityService.getToken() });
        return this.http.get('/api/timesheetentry', {headers: headers})
            .map(res => res.json() as TimesheetEntry[])
            .catch(this.handleError);
    }

    insertTimesheetEntry(timesheetEntry: TimesheetEntry): Observable<TimesheetEntry> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.securityService.getToken() });
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/timesheetentry', timesheetEntry, {headers: headers})
            .map((res: Response) => {
                const data = res.json();
                return data;
            })
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage : string | null = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }

            return Observable.throw(errMessage);
        }

        return Observable.throw(error || 'Server Error');
    }
}