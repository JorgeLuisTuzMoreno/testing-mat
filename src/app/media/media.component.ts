import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  public estimateProxySize: number[] = [];
  public developmentHours: number[] = [];
  public meanEstimate: number = 0;
  public meanDevelopment: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData(); // Llama al método loadData al inicializar
  }

  public loadData(): void { // Cambiado a public
    this.loadTextFile('../data/esp.txt').subscribe(data => {
      this.estimateProxySize = this.parseData(data);
      this.meanEstimate = this.calculateMean(this.estimateProxySize);
    });

    this.loadTextFile('../data/dh.txt').subscribe(data => {
      this.developmentHours = this.parseData(data);
      this.meanDevelopment = this.calculateMean(this.developmentHours);
    });
  }

  private loadTextFile(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  private parseData(data: string): number[] {
    return data.split('\n').map(line => parseFloat(line.trim())).filter(value => !isNaN(value));
  }

  private calculateMean(data: number[]): number {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }
}
