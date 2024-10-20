import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calculate } from '../common/calculate';

@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html'
})
export class LinearRegressionComponent {

  public beta0: number = 0;
  public beta1: number = 0;
  public yk: number = 0;
  public x: number = 0;

  public proxySize: number[] = [];
  public actualAdded: number[] = [];
  public actualDevelop: number[] = [];
  public planAdded: number[] = [];

  constructor(private http: HttpClient) {}

  public loadDataTest(testNumber: number): void {
    let file = '';
    switch (testNumber) {
      case 1: file = '../data/test1.json'; break;
      case 2: file = '../data/test2.json'; break;
      case 3: file = '../data/test3.json'; break;
      case 4: file = '../data/test4.json'; break;
    }
    
    this.http.get<any>(file).subscribe(data => {
      if (testNumber === 1 || testNumber === 2) {
        this.proxySize = data.proxy_size;
        this.actualAdded = data.actual_added ? data.actual_added : [];
        this.actualDevelop = data.actual_develop ? data.actual_develop : [];
      } else {
        this.planAdded = data.plan_added;
        this.actualAdded = data.actual_added ? data.actual_added : [];
        this.actualDevelop = data.actual_develop ? data.actual_develop : [];
      }

      if (testNumber === 1 || testNumber === 3) {
        this.calculateLinearRegression(this.proxySize.length ? this.proxySize : this.planAdded, this.actualAdded);
      } else {
        this.calculateLinearRegression(this.proxySize.length ? this.proxySize : this.planAdded, this.actualDevelop);
      }
    });
  }

  calculateLinearRegression(xValues: number[], yValues: number[]): void {
    const n = xValues.length;

    // Usamos las funciones de Calculate para obtener los valores necesarios
    const avgX = Calculate.sumX(xValues) / n;
    const avgY = Calculate.sumY(yValues) / n;
    const sumXY = Calculate.sumXY(xValues, yValues, avgX, avgY);
    const sumXX = Calculate.sumXX(xValues, avgX);

    // Calcular beta1 (pendiente) y beta0 (intercepto)
    this.beta1 = sumXY / sumXX;
    this.beta0 = avgY - this.beta1 * avgX;

    // Calcular yk si hay un valor de x especificado
    if (this.x !== undefined) {
      this.yk = this.beta0 + this.beta1 * this.x;
    }
  }
}
