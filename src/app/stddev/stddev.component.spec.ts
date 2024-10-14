import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StddevComponent } from './stddev.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agregar esto
      declarations: [StddevComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StddevComponent);
    component = fixture.componentInstance;
  });

  it('should return stddev = 572.03 for the given input', () => {
    const input = [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503];
    const mean = component.calculateMean(input);
    const stddev = component.calculateStdDev(input, mean);
    expect(stddev).toBeCloseTo(572.03, 2); // Comparar con una tolerancia de 2 decimales
    console.log('Test for stddev with input [160,591,114,229,230,270,128,1657,624,1503] passed!');
  });

  it('should return stddev = 62.26 for the given input', () => {
    const input = [15.0, 69.9, 6.5, 22.4, 28.4, 65.9, 19.4, 198.7, 38.8, 138.2];
    const mean = component.calculateMean(input);
    const stddev = component.calculateStdDev(input, mean);
    expect(stddev).toBeCloseTo(62.26, 2); // Comparar con una tolerancia de 2 decimales
    console.log('Test for stddev with input [15.0,69.9,6.5,22.4,28.4,65.9,19.4,198.7,38.8,138.2] passed!');
  });
});
