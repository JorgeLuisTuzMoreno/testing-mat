import { TestBed } from '@angular/core/testing';
import { Correlation } from './correlation.component';

describe('Correlation', () => {

  it('should return r=0.9545 with the dataset Test1', () => {
    const proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    const actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    const r = Correlation.calculateCorrelation(proxySize, actualAdded);
    expect(r).toBeCloseTo(0.9545, 4);
  });

  it('should return rr=0.9111 with the dataset Test1', () => {
    const r = 0.9545;
    const rr = Correlation.calculateR2(r);
    expect(rr).toBeCloseTo(0.9111, 4);
  });

  it('should return r=0.9333 with the dataset Test2', () => {
    const proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    const actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    const r = Correlation.calculateCorrelation(proxySize, actualDevelop);
    expect(r).toBeCloseTo(0.9333, 4);
  });

  it('should return rr=0.8711 with the dataset Test2', () => {
    const r = 0.9333;
    const rr = Correlation.calculateR2(r);
    expect(rr).toBeCloseTo(0.8711, 4);
  });

  it('should return r=0.9631 with the dataset Test3', () => {
    const planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    const actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    const r = Correlation.calculateCorrelation(planAdded, actualAdded);
    expect(r).toBeCloseTo(0.9631, 4);
  });

  it('should return rr=0.9276 with the dataset Test3', () => {
    const r = 0.9631;
    const rr = Correlation.calculateR2(r);
    expect(rr).toBeCloseTo(0.9276, 4);
  });

  it('should return r=0.9480 with the dataset Test4', () => {
    const planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    const actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    const r = Correlation.calculateCorrelation(planAdded, actualDevelop);
    expect(r).toBeCloseTo(0.9480, 4);
  });

  it('should return rr=0.8988 with the dataset Test4', () => {
    const r = 0.9480;
    const rr = Correlation.calculateR2(r);
    expect(rr).toBeCloseTo(0.8987, 4);
  });

});

