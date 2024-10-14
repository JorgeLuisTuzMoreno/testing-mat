import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MediaComponent } from './media.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MediaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
  });

  it('should load estimate proxy size and development hours and calculate the correct means', fakeAsync(() => {
    const espData = `160\n591\n114\n229\n230\n270\n128\n1657\n624\n1503`;
    const dhData = `15.0\n69.9\n6.5\n22.4\n28.4\n65.9\n19.4\n198.7\n38.8\n138.2`;

    // Usar spyOn para interceptar las solicitudes HTTP y devolver los datos simulados
    spyOn(httpClient, 'get').and.callFake((url: string) => {
      if (url.includes('esp.txt')) {
        return of(espData as any); // Devolver espData como Observable<any>
      } else if (url.includes('dh.txt')) {
        return of(dhData as any); // Devolver dhData como Observable<any>
      }
      return of(''); // En caso de cualquier otra URL, devolver un string vacío
    });

    component.loadData(); // Llamamos a loadData()

    tick(); // Simular el paso del tiempo para procesar las solicitudes

    fixture.detectChanges(); // Detectar cambios después de procesar las respuestas

    expect(component.meanEstimate).toEqual(550.6);
    expect(component.meanDevelopment).toBeCloseTo(60.32, 2); // Manejar precisión decimal
  }));
});
