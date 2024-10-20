import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LinearRegressionComponent } from './linear-regression.component';

describe('LinearRegressionComponent', () => {
  let component: LinearRegressionComponent;
  let fixture: ComponentFixture<LinearRegressionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinearRegressionComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LinearRegressionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Prueba para B0, B1 y Yk con test1.json
  it('should calculate B0 and B1 for test1.json', () => {
    component.proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    component.actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    component.calculateLinearRegression(component.proxySize, component.actualAdded);
    
    expect(component.beta0).toBeCloseTo(-22.55, 2);
    expect(component.beta1).toBeCloseTo(1.7279, 4);
  });
  
  it('should calculate yk for test1.json when x = 386', () => {
    component.proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    component.actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    component.x = 386;
    component.calculateLinearRegression(component.proxySize, component.actualAdded);
    
    expect(component.yk).toBeCloseTo(644.429, 3);
  });

  // Prueba para B0, B1 y Yk con test2.json
  it('should calculate B0 and B1 for test2.json', () => {
    component.proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    component.actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    component.calculateLinearRegression(component.proxySize, component.actualDevelop);
    
    expect(component.beta0).toBeCloseTo(-4.039, 3);
    expect(component.beta1).toBeCloseTo(0.1681, 4);
  });

  it('should calculate yk for test2.json when x = 386', () => {
    component.proxySize = [130, 650, 99, 150, 128, 302, 95, 945, 368, 961];
    component.actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    component.x = 386;
    component.calculateLinearRegression(component.proxySize, component.actualDevelop);

    expect(component.yk).toBeCloseTo(60.858, 3);
  });

  // Prueba para B0, B1 y Yk con test3.json
  it('should calculate B0 and B1 for test3.json', () => {
    component.planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    component.actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    component.calculateLinearRegression(component.planAdded, component.actualAdded);
    
    expect(component.beta0).toBeCloseTo(-23.92, 2);
    expect(component.beta1).toBeCloseTo(1.43097, 5);
  });

  it('should calculate yk for test3.json when x = 386', () => {
    component.planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    component.actualAdded = [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601];
    component.x = 386;
    component.calculateLinearRegression(component.planAdded, component.actualAdded);

    expect(component.yk).toBeCloseTo(528.4294, 4);
  });
  
  // Prueba para B0, B1 y Yk con test4.json
  it('should calculate B0 and B1 for test4.json', () => {
    component.planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    component.actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    component.calculateLinearRegression(component.planAdded, component.actualDevelop);
    
    expect(component.beta0).toBeCloseTo(-4.604, 3);
    expect(component.beta1).toBeCloseTo(0.140164, 6);
  });

  it('should calculate yk for test4.json when x = 386', () => {
    component.planAdded = [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130];
    component.actualDevelop = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    component.x = 386;
    component.calculateLinearRegression(component.planAdded, component.actualDevelop);

    expect(component.yk).toBeCloseTo(49.4994, 4);
  });

  // Pruebas de carga de datos desde los archivos test1.json, test2.json, etc.
  it('should load test1.json and calculate linear regression for proxySize and actualAdded', () => {
    const mockData = {
      proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
      actual_added: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
    };

    component.loadDataTest(1);
    const req = httpMock.expectOne('../data/test1.json'); // Ruta actualizada a la carpeta data
    req.flush(mockData); 

    fixture.detectChanges();

    expect(component.proxySize.length).toBe(10);
    expect(component.actualAdded.length).toBe(10);
    expect(component.actualDevelop.length).toBe(0);
    expect(component.beta1).toBeCloseTo(1.7279, 4);
    expect(component.beta0).toBeCloseTo(-22.55, 2);
  });

  it('should load test2.json and calculate linear regression for proxySize and actualDevelop', () => {
    const mockData = {
      proxy_size: [130, 650, 99, 150, 128, 302, 95, 945, 368, 961],
      actual_develop: [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2]
    };

    component.loadDataTest(2);
    const req = httpMock.expectOne('../data/test2.json'); // Ruta actualizada a la carpeta data
    req.flush(mockData); 

    fixture.detectChanges();

    expect(component.proxySize.length).toBe(10);
    expect(component.actualAdded.length).toBe(0);
    expect(component.actualDevelop.length).toBe(10);
    expect(component.beta1).toBeCloseTo(0.1681, 4);
    expect(component.beta0).toBeCloseTo(-4.039, 3); 
  });

  it('should load test3.json and calculate linear regression for planAdded and actualAdded', () => {
    const mockData = {
      plan_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
      actual_added: [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
    };

    component.loadDataTest(3);
    const req = httpMock.expectOne('../data/test3.json'); // Ruta actualizada a la carpeta data
    req.flush(mockData); 

    fixture.detectChanges();

    expect(component.planAdded.length).toBe(10);
    expect(component.actualAdded.length).toBe(10);
    expect(component.actualDevelop.length).toBe(0);
    expect(component.beta1).toBeCloseTo(1.43097, 5);
    expect(component.beta0).toBeCloseTo(-23.92, 2); 
  });

  it('should load test4.json and calculate linear regression for planAdded and actualDevelop', () => {
    const mockData = {
      plan_added: [163, 765, 141, 166, 137, 355, 136, 1206, 433, 1130],
      actual_develop: [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2]
    };

    component.loadDataTest(4);
    const req = httpMock.expectOne('../data/test4.json'); // Ruta actualizada a la carpeta data
    req.flush(mockData); 

    fixture.detectChanges();

    expect(component.planAdded.length).toBe(10);
    expect(component.actualAdded.length).toBe(0);
    expect(component.actualDevelop.length).toBe(10);
    expect(component.beta1).toBeCloseTo(0.140164, 6);
    expect(component.beta0).toBeCloseTo(-4.604, 3); 
  });

});
