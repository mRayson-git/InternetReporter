import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reply } from '../models/reply';
import { Observable, Subject } from 'rxjs';
import { PingLog } from '../models/ping-log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logUrl = "http://localhost:3000/logOverview/"
  logFileSubject: Subject<string> = new Subject<string>();
  logFile$: Observable<string> = this.logFileSubject.asObservable();
  
  logDataSubject: Subject<PingLog> = new Subject<PingLog>();
  PingLog$: Observable<PingLog> = this.logDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLogFiles(): void {
    this.http.get<Reply>(this.logUrl + "files").subscribe(reply => {
      if (reply.success == 0) {
        console.log(reply.message);
      } else if (reply.success == 1) {
        console.log(reply.message);
        reply.payload.forEach(logFile => {
          console.log(logFile);
          this.logFileSubject.next(logFile);
        });
      } else {
        console.log(reply.message);
      }
    });
  }

  getLogData(fileName: string) {
    this.http.get<Reply>(this.logUrl + "data/" + fileName).subscribe(reply => {
      if (reply.success == 0) {
        console.log(reply.message);
      } else if (reply.success == 1) {
        console.log(reply.message);
        reply.payload.forEach(pingLog => {
          this.logDataSubject.next(pingLog);
        });
      } else {
        console.log(reply.message);
      }
    });
  }
}
