import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stddev',
  templateUrl: './stddev.component.html',
  styleUrls: ['./stddev.component.css']
})
export class StddevComponent implements OnInit {
  meanDevelopment: number = 0;
  meanEstimate: number = 0;
  stddevDevelopment: number = 0;
  stddevEstimate: number = 0;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get('../data/esp.txt', { responseType: 'text' })
      .subscribe(data => {
        const values = data.split('\n').map(Number);
        this.meanEstimate = this.calculateMean(values);
        this.stddevEstimate = this.calculateStdDev(values, this.meanEstimate);
      });

    this.http.get('../data/dh.txt', { responseType: 'text' })
      .subscribe(data => {
        const values = data.split('\n').map(Number);
        this.meanDevelopment = this.calculateMean(values);
        this.stddevDevelopment = this.calculateStdDev(values, this.meanDevelopment);
      });
  }

  calculateMean(values: number[]): number {
    const total = values.reduce((acc, value) => acc + value, 0);
    return total / values.length;
  }

  calculateStdDev(values: number[], mean: number): number {
    const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / (values.length - 1); // Cambiado a (n-1) para la muestra
    return Math.sqrt(variance);
  }
}
