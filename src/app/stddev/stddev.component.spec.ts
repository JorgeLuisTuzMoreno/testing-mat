import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StddevComponent } from './stddev.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importamos HttpTestingController

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;
  let httpMock: HttpTestingController; // Variable para controlar las peticiones HTTP

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StddevComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StddevComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inicializamos el mock de HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verificamos que no queden peticiones HTTP sin responder
  });

  it('should return stddev = 572.03 for the given input', () => {
    const input = [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503];
    const mean = component.calculateMean(input);
    const stddev = component.calculateStdDev(input, mean);
    expect(stddev).toBeCloseTo(572.03, 2);
    console.log('Test for stddev with input [160,591,114,229,230,270,128,1657,624,1503] passed!');
  });

  it('should return stddev = 62.26 for the given input', () => {
    const input = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    const mean = component.calculateMean(input);
    const stddev = component.calculateStdDev(input, mean);
    expect(stddev).toBeCloseTo(62.26, 2);
    console.log('Test for stddev with input [15.0,69.9,6.5,22.4,28.4,65.9,19.4,198.7,38.8,138.2] passed!');
  });

  it('should load data from files and calculate stddev for esp.txt and dh.txt', () => {
    component.ngOnInit();

    // Simulamos la respuesta de esp.txt
    const reqEsp = httpMock.expectOne('../data/esp.txt');
    expect(reqEsp.request.method).toBe('GET');
    reqEsp.flush('160\n591\n114\n229\n230\n270\n128\n1657\n624\n1503'); // Simulamos datos

    // Simulamos la respuesta de dh.txt
    const reqDh = httpMock.expectOne('../data/dh.txt');
    expect(reqDh.request.method).toBe('GET');
    reqDh.flush('15.0\n69.9\n6.5\n22.4\n28.4\n65.9\n19.4\n198.7\n38.8\n138.2'); // Simulamos datos

    expect(component.stddevEstimate).toBeCloseTo(572.03, 2);
    expect(component.stddevDevelopment).toBeCloseTo(62.26, 2);
  });
});
