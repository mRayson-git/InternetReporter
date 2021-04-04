import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PingLog } from '../shared/models/ping-log';
import { LogService } from '../shared/services/log.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-log-overview',
  templateUrl: './log-overview.component.html',
  styleUrls: ['./log-overview.component.scss']
})
export class LogOverviewComponent implements OnInit {

  logFiles: string[] = [];

  // Log data
  timestamps: number[] = [];
  pings: number[] = [];
  chart: Chart;

  logSelectForm: FormGroup;

  constructor(private ls: LogService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Subscribing to observables
    this.ls.logFile$.subscribe(logfile => {
      this.logFiles.push(logfile);
    });
    this.ls.PingLog$.subscribe(pingLog => {
      this.timestamps.push(pingLog.time);
      this.pings.push(pingLog.ping);
      this.chart.update();
    });

    this.logSelectForm = this.fb.group({
      fileName: [''],
    });

    this.ls.getLogFiles();
  }

  getLogData(): void {
    this.timestamps = [];
    this.pings = [];
    this.ls.getLogData(this.logSelectForm.get('fileName').value);
    this.createChart();
  }

  printData(): void {
    console.log(this.timestamps);
  }

  createChart(): void {
    console.log(this.timestamps);
    console.log(this.pings);

    let ctx = 'mychart';
    this.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        labels: this.timestamps,
        datasets: [{
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.pings,
          fill: false
        }]
      },
      // Configuration options go here
      options: {}
    });
  }

}
