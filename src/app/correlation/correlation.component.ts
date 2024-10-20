import { Calculate } from '../common/calculate';

export class Correlation {

  // Función para calcular la correlación (r)
  static calculateCorrelation(xValues: number[], yValues: number[]): number {
    const n = xValues.length;
    const avgX = Calculate.sumX(xValues) / n;
    const avgY = Calculate.sumY(yValues) / n;
    const sumXY = Calculate.sumXY(xValues, yValues, avgX, avgY);
    const sumXX = Calculate.sumXX(xValues, avgX);
    const sumYY = Calculate.sumYY(yValues, avgY);
    
    // Fórmula para la correlación de Pearson
    const r = sumXY / Math.sqrt(sumXX * sumYY);
    return r;
  }

  // Función para calcular el coeficiente de determinación (r²)
  static calculateR2(r: number): number {
    return r * r;
  }
}
